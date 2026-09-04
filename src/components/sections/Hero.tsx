import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SECTION_IDS, anchor } from "@/lib/sections";

const KPIS = [
  {
    id: "hero-kpi-01",
    value: "100%",
    label: "파트너 결정 주권",
    caption: "단가·작업방식·자재 선택 전면 자율",
    valueClass: "from-on-surface to-primary",
    labelClass: "text-primary",
  },
  {
    id: "hero-kpi-02",
    value: "0원",
    label: "초기 가입 & 입점비",
    caption: "기본 프로필 등록·홍보 노출 무료",
    valueClass: "from-on-surface to-tertiary",
    labelClass: "text-tertiary",
  },
  {
    id: "hero-kpi-03",
    value: "3.8x",
    label: "유효 매칭 전환율",
    caption: "단순 견적조회 대비 실계약 전환 밀도",
    valueClass: "from-on-surface to-secondary",
    labelClass: "text-secondary",
  },
  {
    id: "hero-kpi-04",
    value: "24/7",
    label: "AI 오토매칭 가동",
    caption: "상시 유효 수요 선별 및 큐레이션 라우팅",
    valueClass: "from-on-surface to-primary-container",
    labelClass: "text-primary-fixed",
  },
];

const TRUST_POINTS = ["파트너 주권 보장", "입점 수수료 0원", "진성 고객만 연결"];

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface pb-24 pt-28 md:pb-32 md:pt-32"
    >
      {/* 배경 이미지 + 앰비언트 글로우 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#071E4A_0%,#000F26_70%)]" />

        <Image
          src="/images/hero-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />

        {/*
         * 비대칭 3-stop 그라디언트 (이미지 노출도 기준 10% → 80% → 10%).
         *
         * 피크를 화면 정중앙(50%)이 아닌 72% 지점에 둡니다:
         *  - 헤드라인이 놓이는 좌측 0~58% 구간은 어둡게 유지해 가독성을 지키고
         *  - 오른쪽 끝(100%)을 다시 어둡게 떨어뜨려 이미지가 화면 가장자리에
         *    붙어 보이는(= 레이아웃이 오른쪽으로 쏠려 보이는) 현상을 없앱니다.
         */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,18,48,0.93)_0%,rgba(0,18,48,0.86)_30%,rgba(0,18,48,0.58)_56%,rgba(0,18,48,0.42)_70%,rgba(0,18,48,0.68)_84%,rgba(0,18,48,0.93)_100%)]" />

        {/*
         * 뷰포트가 넓어질수록 크롭이 달라져 인물이 다시 밝게 살아나므로,
         * 오른쪽 가장자리에 세로 방향 비네트를 한 겹 더 얹어 감쇠를 고정합니다.
         */}
        <div className="absolute inset-y-0 right-0 w-[28%] bg-[linear-gradient(to_right,transparent_0%,rgba(0,18,48,0.55)_60%,rgba(0,18,48,0.85)_100%)]" />

        {/* 모바일은 카피가 이미지 위 전면에 놓이므로 한 겹 더 덮습니다. */}
        <div className="absolute inset-0 bg-surface/70 lg:hidden" />

        {/* 위아래 섹션 경계와 자연스럽게 이어지도록 수직 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />

        <div className="absolute -right-24 top-1/4 h-[600px] w-[600px] rounded-full bg-tertiary/10 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-secondary-container/10 blur-[140px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
          {/* 카피 */}
          <div id="hero-copy" className="flex flex-col items-start gap-gutter-md lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high/90 px-3.5 py-1.5 font-mono text-label-code text-tertiary shadow-sm">
              <span aria-hidden className="h-2 w-2 animate-ping rounded-full bg-tertiary" />
              NEXT-GEN MOBILITY AFTERMARKET ECOSYSTEM
            </div>

            <h1 className="font-sora text-display-hero-mobile font-bold leading-[1.15] tracking-tight text-on-surface drop-shadow-[0_4px_16px_rgba(0,18,48,0.8)] lg:text-display-hero">
              통제받지 않는 전문성,
              <br />
              <span className="bg-gradient-to-r from-primary-fixed via-tertiary to-primary-container bg-clip-text text-transparent">
                모빌리티 생태계의
              </span>
              <br />
              새로운 연결 기준
            </h1>

            <p className="mt-1 font-sora text-headline-sm font-semibold text-secondary">
              인간 주도형 기술과 상생 생태계로 구현하는 애프터마켓의 미래
            </p>

            <p className="max-w-2xl font-jakarta text-body-lg leading-relaxed text-on-surface-variant">
              단방향 가격 경쟁과 치킨 게임은 끝났습니다. AUTRIN과 함께 당신이 축적해 온
              기술(Skill)과 신뢰(Trust)의 가치를 되찾으세요.
            </p>

            <div className="flex w-full flex-col gap-gutter-md pt-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={anchor("contact")}
                className="inline-flex h-14 items-center justify-center rounded-xl bg-secondary-container px-8 font-sora text-body-lg font-bold text-on-secondary-container shadow-[0_0_25px_rgba(5,102,217,0.45)] transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_35px_rgba(90,154,228,0.6)]"
              >
                <Icon name="verified" className="mr-2 text-xl" />
                오토멤버십 문의하기
              </a>
              <a
                href={anchor("solution")}
                className="inline-flex h-14 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-highest/70 px-6 font-jakarta text-body-lg font-semibold text-on-surface shadow-md transition-all duration-300 hover:bg-surface-container-high"
              >
                파트너 혜택 확인하기
                <Icon name="arrow_forward" className="ml-1 text-lg" />
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 font-mono text-body-sm text-on-surface-variant">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <Icon name="check_circle" className="text-base text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* 배경 배너 이미지가 드러나는 여백 영역 */}
          <div id="hero-visual" aria-hidden className="hidden lg:col-span-5 lg:block" />
        </div>

        {/* KPI 바 */}
        <div
          id="hero-kpi-bar"
          className="glass-card relative z-10 mt-16 grid grid-cols-2 gap-gutter-md rounded-xl p-gutter-lg md:grid-cols-4"
        >
          {KPIS.map((kpi) => (
            <div
              key={kpi.id}
              id={kpi.id}
              className="flex flex-col items-center rounded-xl bg-surface-container-lowest/60 p-4 text-center md:items-start md:text-left"
            >
              <div
                className={`bg-gradient-to-r bg-clip-text font-sora text-headline-lg-mobile font-bold tracking-tight text-transparent md:text-headline-lg ${kpi.valueClass}`}
              >
                {kpi.value}
              </div>
              <div className={`mt-1 font-sora text-body-md font-semibold ${kpi.labelClass}`}>
                {kpi.label}
              </div>
              <div className="mt-0.5 font-jakarta text-body-sm text-on-surface-variant">
                {kpi.caption}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
