/**
 * 랜딩페이지 섹션 ID 레지스트리 (Single Source of Truth)
 *
 * 작업/수정 요청 시 위치를 명확히 전달하기 위해 모든 섹션은 고정 ID를 가집니다.
 * 헤더 네비게이션·푸터 링크는 이 파일의 값을 참조하므로 앵커가 어긋나지 않습니다.
 *
 * 예) "#solution-section 의 solution-card-02 문구 수정해주세요"
 */
export const SECTION_IDS = {
  header: "global-header",
  hero: "hero-section",
  ecosystem: "ecosystem-section",
  problem: "problem-section",
  solution: "solution-section",
  technology: "technology-section",
  bottomCta: "bottom-cta-section",
  contact: "contact-form-section",
  footer: "global-footer",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

/** 앵커 href 헬퍼 — `#` 접두사를 직접 쓰지 않도록 통일 */
export const anchor = (key: SectionKey) => `#${SECTION_IDS[key]}`;

/** 헤더 / 푸터 공용 네비게이션 항목 */
export const NAV_ITEMS: { label: string; key: SectionKey }[] = [
  { label: "서비스 소개", key: "hero" },
  { label: "에코시스템", key: "ecosystem" },
  { label: "문제와 솔루션", key: "problem" },
  { label: "파트너 혜택", key: "solution" },
  { label: "CRM 기술", key: "technology" },
  { label: "제휴 문의", key: "contact" },
];
