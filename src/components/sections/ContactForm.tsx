"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  BUSINESS_CATEGORIES,
  EMPTY_INQUIRY,
  validateInquiry,
  type FieldErrors,
  type InquiryInput,
} from "@/lib/inquiry";
import { SECTION_IDS } from "@/lib/sections";

// 높이/패딩은 필드 타입별로 따로 지정 — 한 문자열에 h-12와 h-auto를 섞으면
// Tailwind 유틸리티가 서로를 덮어써 순서에 의존하게 됩니다.
const FIELD_BASE =
  "w-full rounded-xl border bg-surface-container-lowest font-jakarta text-body-md text-on-surface transition-colors placeholder:text-outline focus:outline-none focus:ring-[3px] focus:ring-primary-container/20";
const INPUT_BASE = `${FIELD_BASE} h-12 px-4`;
const TEXTAREA_BASE = `${FIELD_BASE} resize-y p-4`;
const INPUT_OK = "border-outline-variant/30 focus:border-primary-container";
const INPUT_ERR = "border-error focus:border-error focus:ring-error/20";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<InquiryInput>(EMPTY_INQUIRY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const update = (field: keyof InquiryInput) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // 입력을 고치는 즉시 해당 필드 오류는 지웁니다.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateInquiry(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json();

      if (!response.ok) {
        setErrors(payload?.errors ?? {});
        setServerMessage(payload?.message ?? "접수에 실패했습니다. 잠시 후 다시 시도해주세요.");
        setStatus("error");
        return;
      }

      setValues(EMPTY_INQUIRY);
      setErrors({});
      setStatus("success");
    } catch {
      setServerMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id={SECTION_IDS.contact} className="w-full bg-surface py-20 md:py-section-md">
        <Container className="max-w-[800px]">
          <div
            id="contact-success-panel"
            className="glass-card flex flex-col items-center rounded-xl p-10 text-center sm:p-14"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary/20 text-tertiary">
              <Icon name="task_alt" className="text-4xl" />
            </div>
            <h2 className="font-sora text-headline-sm font-bold text-on-surface sm:text-headline-md">
              문의가 정상적으로 접수되었습니다
            </h2>
            <p className="mt-3 font-jakarta text-body-lg text-on-surface-variant">
              파트너십 담당 매니저가 24시간 이내에 남겨주신 연락처로 직접 연락드리겠습니다.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-high px-6 font-jakarta text-body-md font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
            >
              추가 문의 남기기
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id={SECTION_IDS.contact} className="w-full bg-surface py-20 md:py-section-md">
      <Container className="max-w-[800px]">
        <SectionHeading
          eyebrow="Inquiry Desk"
          title="가입 전 궁금한 점이 있으신가요?"
          description="남겨주시면 모빌리티 전문 파트너십 담당 매니저가 24시간 이내에 직접 연락드리겠습니다."
          className="mb-12"
        />

        <div className="glass-card rounded-xl p-6 sm:p-10">
          <form
            id="partner-inquiry-form"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                id="company-name"
                label="업체명 (상호)"
                required
                error={errors.companyName}
              >
                <input
                  id="company-name"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  placeholder="예: 오트린 모터스"
                  value={values.companyName}
                  onChange={(event) => update("companyName")(event.target.value)}
                  aria-invalid={Boolean(errors.companyName)}
                  aria-describedby={errors.companyName ? "company-name-error" : undefined}
                  className={`${INPUT_BASE} ${errors.companyName ? INPUT_ERR : INPUT_OK}`}
                />
              </Field>

              <Field
                id="contact-name"
                label="담당자 성함 / 직책"
                required
                error={errors.contactName}
              >
                <input
                  id="contact-name"
                  name="contactName"
                  type="text"
                  autoComplete="name"
                  placeholder="예: 홍길동 대표"
                  value={values.contactName}
                  onChange={(event) => update("contactName")(event.target.value)}
                  aria-invalid={Boolean(errors.contactName)}
                  aria-describedby={errors.contactName ? "contact-name-error" : undefined}
                  className={`${INPUT_BASE} ${errors.contactName ? INPUT_ERR : INPUT_OK}`}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field id="phone-number" label="연락처 (휴대전화)" required error={errors.phone}>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="010-0000-0000"
                  value={values.phone}
                  onChange={(event) => update("phone")(event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-number-error" : undefined}
                  className={`${INPUT_BASE} ${errors.phone ? INPUT_ERR : INPUT_OK}`}
                />
              </Field>

              <Field
                id="business-category"
                label="주요 업종 구분"
                required
                error={errors.category}
              >
                <div className="relative">
                  <select
                    id="business-category"
                    name="category"
                    value={values.category}
                    onChange={(event) => update("category")(event.target.value)}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? "business-category-error" : undefined}
                    className={`${INPUT_BASE} appearance-none pr-10 ${
                      errors.category ? INPUT_ERR : INPUT_OK
                    } ${values.category ? "" : "text-outline"}`}
                  >
                    <option value="" disabled>
                      업종을 선택해주세요
                    </option>
                    {BUSINESS_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="expand_more"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                </div>
              </Field>
            </div>

            <Field id="inquiry-message" label="문의 내용 및 희망 제휴 영역" error={errors.message}>
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                placeholder="보유 기술 특기, 지역, 제휴 관련 질문사항을 자유롭게 작성해주세요."
                value={values.message}
                onChange={(event) => update("message")(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "inquiry-message-error" : undefined}
                className={`${TEXTAREA_BASE} ${errors.message ? INPUT_ERR : INPUT_OK}`}
              />
            </Field>

            {/* 개인정보 안내 */}
            <div className="flex items-start gap-2 rounded-xl bg-surface-container-lowest/50 p-3 font-jakarta text-body-sm text-on-surface-variant">
              <Icon name="info" className="mt-0.5 text-base text-primary" />
              <span>
                입력해주신 연락처 정보는 파트너 제휴 상담 목적 이외의 용도로 절대 활용되거나 외부에
                제공되지 않습니다.
              </span>
            </div>

            {status === "error" && serverMessage ? (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-xl bg-error-container/30 p-3 font-jakarta text-body-sm text-error"
              >
                <Icon name="error" className="text-base" />
                {serverMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-secondary-container font-sora text-body-lg font-bold text-on-secondary-container shadow-xl transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "접수 중..." : "문의 접수하기"}
              <Icon name={status === "submitting" ? "progress_activity" : "send"} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-jakarta text-body-sm font-semibold text-on-surface">
        {label} {required ? <span className="text-error">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-jakarta text-body-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
