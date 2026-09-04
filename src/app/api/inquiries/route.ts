import { NextResponse } from "next/server";
import {
  clearFailures,
  isAdminPasswordConfigured,
  isRateLimited,
  recordFailure,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { readInquiries } from "@/lib/inquiryStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const PAGE_SIZE = 10;

/**
 * 시도 횟수 제한에 쓸 클라이언트 식별자.
 *
 * X-Forwarded-For 의 "첫" 값을 쓰면 안 됩니다. Nginx 의
 * `$proxy_add_x_forwarded_for` 는 클라이언트가 보낸 XFF 뒤에 실제 IP를 덧붙이므로,
 * 첫 값은 클라이언트가 마음대로 넣을 수 있습니다. 매 요청마다 다른 값을 흘려보내면
 * 시도 제한이 그대로 무력화됩니다.
 *
 * 그래서 Nginx 가 $remote_addr 로 덮어쓰는 X-Real-IP 를 우선 사용하고,
 * 없으면 XFF 의 "마지막" 값(가장 가까운 프록시가 붙인 실제 접속 IP)을 씁니다.
 * → Nginx 설정에 `proxy_set_header X-Real-IP $remote_addr;` 가 반드시 있어야 합니다.
 */
function clientKey(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((v) => v.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return "local";
}

/**
 * 문의 목록 조회 (비밀번호 필요)
 *
 * 인증 없이 목록이 새어나가면 안 되므로 GET은 열지 않고 POST로만 받습니다.
 * 비밀번호 검증도 전부 서버에서 수행하며, 클라이언트에는 절대 내려보내지 않습니다.
 */
export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    console.error("[inquiries] INQUIRY_ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.");
    return NextResponse.json(
      { ok: false, message: "서버에 조회 비밀번호가 설정되지 않았습니다. 관리자에게 문의하세요." },
      { status: 503 },
    );
  }

  let body: { password?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const ip = clientKey(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "시도 횟수를 초과했습니다. 5분 후 다시 시도해주세요." },
      { status: 429 },
    );
  }

  if (!verifyAdminPassword(body.password)) {
    recordFailure(ip);
    return NextResponse.json({ ok: false, message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
  }

  clearFailures(ip);

  const all = await readInquiries();

  // 파일에는 등록 순으로 쌓이므로 등록 순 번호를 매긴 뒤 역순으로 뒤집습니다.
  // → 가장 최근 글이 가장 큰 번호로 맨 위에 옵니다.
  const numbered = all
    .map((record, index) => ({ ...record, number: index + 1 }))
    .reverse();

  const total = numbered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rawPage = Number(body.page);
  const page = Math.min(Math.max(Number.isFinite(rawPage) ? Math.trunc(rawPage) : 1, 1), totalPages);
  const items = numbered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return NextResponse.json({ ok: true, items, page, totalPages, total, pageSize: PAGE_SIZE });
}
