import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SECTION_IDS, anchor } from "@/lib/sections";

export function BottomCta() {
  return (
    <section
      id={SECTION_IDS.bottomCta}
      className="relative w-full overflow-hidden bg-gradient-to-r from-surface-container-low via-surface-container-high to-surface-container-low py-20 text-center md:py-section-md"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary/5 backdrop-blur-2xl" />

      <Container className="relative z-10 flex flex-col items-center">
        <span className="mb-4 rounded-full bg-secondary-container/40 px-4 py-1.5 font-mono text-body-sm font-semibold text-secondary">
          JOIN THE TRUST ALLIANCE
        </span>

        <h2 className="max-w-2xl font-sora text-headline-lg-mobile font-bold leading-tight text-on-surface md:text-headline-lg">
          독점이 아닌 공존,
          <br />
          <span className="text-tertiary">&lsquo;신뢰의 아치&rsquo;</span>에 합류하시겠습니까?
        </h2>

        <p className="mb-8 mt-4 max-w-xl font-jakarta text-body-lg text-on-surface-variant md:text-body-xl">
          비용 0, 기회 무한. 오직 서비스 품질과 당신만의 전문성에만 집중하세요. 나머지는 AUTRIN
          네트워크가 백업합니다.
        </p>

        <a
          href={anchor("contact")}
          className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-secondary-container px-10 font-sora text-body-xl font-bold text-on-secondary-container shadow-2xl transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container sm:w-auto"
        >
          <Icon name="electric_bolt" className="mr-2 text-2xl" />
          1분 만에 파트너 신청하기
        </a>

        <p className="mt-4 font-mono text-body-sm text-on-surface-variant">
          별도의 심사비나 서류 전형료는 일절 발생하지 않습니다.
        </p>
      </Container>
    </section>
  );
}
