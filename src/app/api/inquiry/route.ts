import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  categoryLabel,
  validateInquiry,
  type InquiryInput,
  type InquiryRecord,
} from "@/lib/inquiry";

// fs 접근이 필요하므로 Node.js 런타임에서만 동작합니다.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

/**
 * 동시 요청이 같은 파일을 read-modify-write 할 때 유실되지 않도록
 * 쓰기 작업을 단일 프로미스 체인에 직렬화합니다.
 */
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.catch(() => undefined);
  return result;
}

async function readInquiries(): Promise<InquiryRecord[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as InquiryRecord[]) : [];
  } catch (error) {
    // 파일이 아직 없으면 빈 목록에서 시작합니다.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function appendInquiry(record: InquiryRecord): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const inquiries = await readInquiries();
  inquiries.push(record);
  await writeFile(DATA_FILE, `${JSON.stringify(inquiries, null, 2)}\n`, "utf-8");
}

export async function POST(request: Request) {
  let body: Partial<InquiryInput>;

  try {
    body = (await request.json()) as Partial<InquiryInput>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const errors = validateInquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "입력값을 다시 확인해주세요.", errors },
      { status: 422 },
    );
  }

  const record: InquiryRecord = {
    id: randomUUID(),
    companyName: body.companyName!.trim(),
    contactName: body.contactName!.trim(),
    phone: body.phone!.trim(),
    category: body.category!,
    categoryLabel: categoryLabel(body.category!),
    message: body.message?.trim() ?? "",
    createdAt: new Date().toISOString(),
  };

  try {
    await enqueue(() => appendInquiry(record));
  } catch (error) {
    console.error("[inquiry] 저장 실패", error);
    return NextResponse.json(
      { ok: false, message: "일시적인 오류로 접수하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}
