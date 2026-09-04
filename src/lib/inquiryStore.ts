import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { InquiryRecord } from "@/lib/inquiry";

/** 문의 데이터 파일 접근 (서버 전용) */
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

export async function readInquiries(): Promise<InquiryRecord[]> {
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

export function appendInquiry(record: InquiryRecord): Promise<void> {
  return enqueue(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const inquiries = await readInquiries();
    inquiries.push(record);
    await writeFile(DATA_FILE, `${JSON.stringify(inquiries, null, 2)}\n`, "utf-8");
  });
}

/**
 * 문의 1건 삭제. 되돌릴 수 없습니다.
 * 반환값은 실제로 삭제되었는지 여부(없는 id면 false).
 */
export function deleteInquiry(id: string): Promise<boolean> {
  return enqueue(async () => {
    const inquiries = await readInquiries();
    const next = inquiries.filter((item) => item.id !== id);
    if (next.length === inquiries.length) return false;

    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, `${JSON.stringify(next, null, 2)}\n`, "utf-8");
    return true;
  });
}
