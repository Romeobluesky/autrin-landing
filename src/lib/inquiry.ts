/** 파트너 문의 폼 — 클라이언트/서버 공용 스키마 및 검증 */

export const BUSINESS_CATEGORIES = [
  { value: "repair", label: "전문 정비 (경정비 / 판금도색 / 수입차)" },
  { value: "car-care", label: "카케어 (디테일링 / 틴팅 / 랩핑 / PPF)" },
  { value: "used-car", label: "신·중고차 매매 및 진단 평가" },
  { value: "parts", label: "부품·용품 유통 및 제조" },
  { value: "rental-logistics", label: "렌트 / 탁송 / 모빌리티 물류" },
  { value: "recycle-salvage", label: "폐차 및 재활용 리퍼비시" },
  { value: "other", label: "기타 모빌리티 비즈니스" },
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number]["value"];

export type InquiryInput = {
  companyName: string;
  contactName: string;
  phone: string;
  category: string;
  message: string;
};

/** 저장 레코드 — data/inquiries.json 에 append 되는 형태 */
export type InquiryRecord = InquiryInput & {
  id: string;
  categoryLabel: string;
  createdAt: string;
};

export const EMPTY_INQUIRY: InquiryInput = {
  companyName: "",
  contactName: "",
  phone: "",
  category: "",
  message: "",
};

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

const PHONE_PATTERN = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

/**
 * 필수값·형식 검증. 클라이언트와 API 라우트가 동일한 규칙을 공유하므로
 * 브라우저 검증을 우회한 요청도 서버에서 동일하게 걸러집니다.
 */
export function validateInquiry(input: Partial<InquiryInput>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.companyName?.trim()) {
    errors.companyName = "업체명(상호)을 입력해주세요.";
  } else if (input.companyName.trim().length > 100) {
    errors.companyName = "업체명은 100자 이내로 입력해주세요.";
  }

  if (!input.contactName?.trim()) {
    errors.contactName = "담당자 성함을 입력해주세요.";
  } else if (input.contactName.trim().length > 50) {
    errors.contactName = "담당자 성함은 50자 이내로 입력해주세요.";
  }

  const phone = input.phone?.replace(/\s/g, "") ?? "";
  if (!phone) {
    errors.phone = "연락처를 입력해주세요.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "올바른 연락처 형식이 아닙니다. (예: 010-0000-0000)";
  }

  if (!input.category) {
    errors.category = "주요 업종을 선택해주세요.";
  } else if (!BUSINESS_CATEGORIES.some((item) => item.value === input.category)) {
    errors.category = "선택할 수 없는 업종입니다.";
  }

  if ((input.message?.length ?? 0) > 2000) {
    errors.message = "문의 내용은 2000자 이내로 입력해주세요.";
  }

  return errors;
}

export function categoryLabel(value: string): string {
  return BUSINESS_CATEGORIES.find((item) => item.value === value)?.label ?? value;
}
