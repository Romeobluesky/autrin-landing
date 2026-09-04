import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BottomCta } from "@/components/sections/BottomCta";
import { ContactForm } from "@/components/sections/ContactForm";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Technology } from "@/components/sections/Technology";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

/**
 * AUTRIN 랜딩페이지 섹션 순서 (각 섹션 ID는 src/lib/sections.ts 참조)
 *
 * 1. hero-section          — 도입부 / 메인 카피 + KPI
 * 2. ecosystem-section     — 8개 카테고리 생태계 그리드
 * 3. problem-section       — 문제 제기 및 기존 플랫폼 대비 비교
 * 4. solution-section      — 핵심 가치 3 Pillar
 * 5. technology-section    — CRM 웹 콘솔 기술과 신뢰
 * 6. bottom-cta-section    — 최종 전환 CTA
 * 7. contact-form-section  — 파트너 문의 폼
 * 8. global-footer         — 푸터
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="global-main-viewport" className="w-full overflow-x-hidden bg-surface">
        <Hero />
        <Ecosystem />
        <Problem />
        <Solution />
        <Technology />
        <BottomCta />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
