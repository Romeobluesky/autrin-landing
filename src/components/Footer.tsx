import Image from "next/image";
import { InquiryBoard } from "@/components/admin/InquiryBoard";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SECTION_IDS, anchor } from "@/lib/sections";

const PLATFORM_LINKS = NAV_ITEMS.slice(0, 4);

const POLICY_LINKS = [
  { label: "파트너 혜택 요강", href: anchor("solution") },
  { label: "B2B 제휴 및 입점 상담", href: anchor("contact") },
  { label: "서비스 이용약관", href: "/terms" },
  { label: "개인정보 처리방침", href: "/privacy" },
];

export function Footer() {
  return (
    <footer
      id={SECTION_IDS.footer}
      className="w-full border-t border-outline-variant/20 bg-surface-container-lowest pb-gutter-xl pt-section-sm text-on-surface-variant"
    >
      <Container>
        <div className="grid grid-cols-1 gap-gutter-xl pb-gutter-xl md:grid-cols-12">
          {/* 브랜드 요약 */}
          <div className="flex flex-col items-start gap-gutter-md md:col-span-5" id="footer-brand-summary">
            <Image
              src="/logo/autotrinity-wordmark.png"
              alt="AUTOTRINITY"
              width={600}
              height={81}
              className="h-8 w-auto object-contain"
            />
            <p className="max-w-md font-jakarta text-body-md text-on-surface-variant">
              차세대 커넥티드 차량 데이터와 정밀 정비 네트워크를 결합한 B2B 모빌리티 애프터마켓 통합
              인프라 솔루션
            </p>
            {/* AUTRIN 클릭 → 비밀번호 모달 → 문의 게시판 */}
            <InquiryBoard />
          </div>

          {/* 네비게이션 */}
          <div className="grid grid-cols-2 gap-gutter-md md:col-span-4" id="footer-navigation-links">
            <div className="flex flex-col gap-gutter-xs">
              <span className="mb-gutter-xs font-sora text-body-sm font-semibold uppercase tracking-wider text-on-surface">
                플랫폼 아키텍처
              </span>
              {PLATFORM_LINKS.map(({ label, key }) => (
                <a
                  key={key}
                  href={anchor(key)}
                  className="font-jakarta text-body-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-gutter-xs">
              <span className="mb-gutter-xs font-sora text-body-sm font-semibold uppercase tracking-wider text-on-surface">
                파트너십 &amp; 정책
              </span>
              {POLICY_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-jakarta text-body-sm text-on-surface-variant transition-colors hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div
            className="flex flex-col gap-gutter-xs font-jakarta text-body-sm md:col-span-3"
            id="footer-contact-info"
          >
            <span className="mb-gutter-xs font-sora text-body-sm font-semibold uppercase tracking-wider text-on-surface">
              Customer Center
            </span>
            <p>인천시 부평구 갈산동 인천테크노벨리 C-1118</p>
            <p>
              파트너 문의:{" "}
              <a href="mailto:ssl003@naver.com" className="font-mono text-secondary hover:text-primary">
                ssl003@naver.com
              </a>
            </p>
            <p>
              운영 지원:{" "}
              <a
                href="mailto:delevloper@formooon.com"
                className="font-mono text-secondary hover:text-primary"
              >
                delevloper@formooon.com
              </a>
            </p>
            <p className="font-mono text-label-code">
              TEL:{" "}
              <a href="tel:07086661428" className="hover:text-primary">
                070-8666-1428
              </a>
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-gutter-sm border-t border-outline-variant/10 pt-gutter-lg sm:flex-row"
          id="footer-legal-bar"
        >
          <span className="text-center font-jakarta text-body-sm text-on-surface-variant sm:text-left">
            © {new Date().getFullYear()} AUTRIN / AUTOTRINITY Inc. All rights reserved. Precision
            Mobility Aftermarket Systems.
          </span>
          <a
            href={anchor("hero")}
            className="font-mono text-label-code text-on-surface-variant transition-colors hover:text-primary"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
