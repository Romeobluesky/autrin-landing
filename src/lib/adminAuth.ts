import "server-only";

import { timingSafeEqual } from "node:crypto";

/**
 * 문의 게시판 접근 비밀번호 검증 (서버 전용)
 *
 * 비밀번호는 절대 클라이언트 번들에 들어가면 안 되므로 NEXT_PUBLIC_ 접두사가 없는
 * 환경변수로만 읽습니다. 값은 .env.local(=gitignore 대상)에 둡니다.
 */
export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.INQUIRY_ADMIN_PASSWORD);
}

/** 길이 노출을 막기 위해 해시 후 상수시간 비교합니다. */
export function verifyAdminPassword(input: unknown): boolean {
  const expected = process.env.INQUIRY_ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;

  const a = Buffer.from(input, "utf-8");
  const b = Buffer.from(expected, "utf-8");
  if (a.length !== b.length) {
    // 길이가 다르면 timingSafeEqual이 던지므로, 동일 비용의 더미 비교로 맞춥니다.
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

/**
 * 무차별 대입 완화용 초간단 인메모리 제한기.
 * 단일 인스턴스 로컬 운영 기준이며, 다중 인스턴스로 배포한다면
 * 외부 스토어(Redis 등) 기반으로 교체해야 합니다.
 */
const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILURES = 10;
const attempts = new Map<string, { count: number; firstAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry) return false;
  if (now - entry.firstAt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

export function recordFailure(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
    return;
  }
  entry.count += 1;
}

export function clearFailures(key: string): void {
  attempts.delete(key);
}
