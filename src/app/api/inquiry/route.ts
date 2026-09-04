import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  categoryLabel,
  validateInquiry,
  type InquiryInput,
  type InquiryRecord,
} from "@/lib/inquiry";
import { appendInquiry } from "@/lib/inquiryStore";

// fs 접근이 필요하므로 Node.js 런타임에서만 동작합니다.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    await appendInquiry(record);
  } catch (error) {
    console.error("[inquiry] 저장 실패", error);
    return NextResponse.json(
      { ok: false, message: "일시적인 오류로 접수하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}
