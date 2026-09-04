import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/lib/sections";

const PILLARS = [
  {
    id: "solution-card-01",
    pillar: "PILLAR 01",
    icon: "balance",
    title: "파트너 주권 100% 보장",
    body: "단가 결정, 작업 방식, 부품 및 소모품 자재 선택부터 최종 계약 조건 수립까지 모든 프로세스는 파트너의 고유 권한입니다. 우리는 그 권리를 침해하지 않습니다.",
    footnote: "자율적 단가 및 예약 승인권",
    iconWrap: "bg-primary-container/20 text-primary",
    labelClass: "text-primary",
    dotClass: "bg-primary",
  },
  {
    id: "solution-card-02",
    pillar: "PILLAR 02",
    icon: "psychology",
    title: "AI 오토매칭 에이전트",
    body: "단순 가격 줄세우기가 아닙니다. 차량 차종, 연식, 정밀 고장 코드(DTC), 파트너의 특화 기술 역량과 실시간 작업 여력을 종합 분석하여 전환율 높은 유효 수요만을 선별 연결합니다.",
    footnote: "무의미한 견적 문의 사전 차단",
    iconWrap: "bg-tertiary/20 text-tertiary",
    labelClass: "text-tertiary",
    dotClass: "bg-tertiary",
  },
  {
    id: "solution-card-03",
    pillar: "PILLAR 03",
    icon: "savings",
    title: "진입 장벽 ZERO",
    body: "초기 가입비, 기본 프로필 등록비, 상위 노출 경매 비용이 전면 무료입니다. 자본력의 차이가 아닌 전문성과 시공 품질 그 자체로 고객에게 선택받는 평등한 환경을 약속합니다.",
    footnote: "투명한 성과 연동제 운영",
    iconWrap: "bg-secondary-container/30 text-secondary",
    labelClass: "text-secondary",
    dotClass: "bg-secondary",
  },
];

export function Solution() {
  return (
    <section
      id={SECTION_IDS.solution}
      className="w-full bg-surface-container-low py-20 md:py-section-md"
    >
      <Container>
        <SectionHeading
          eyebrow="Our Core Philosophy"
          eyebrowTone="tertiary"
          title={
            <>
              AUTRIN은 통제하지 않습니다.
              <br />
              <span className="text-primary-container">오직 &lsquo;최적의 연결&rsquo;만 제공합니다.</span>
            </>
          }
          description="플랫폼 독점이 아닌, 파트너 중심의 탈중앙화 비즈니스 모델"
          className="mb-16"
        />

        <div id="solution-grid" className="grid grid-cols-1 gap-gutter-lg md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className="glass-card glass-card-hover group flex flex-col justify-between rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${pillar.iconWrap}`}
                >
                  <Icon name={pillar.icon} className="text-3xl" />
                </div>
                <div className={`mb-2 font-mono text-label-code ${pillar.labelClass}`}>
                  {pillar.pillar}
                </div>
                <h3 className="mb-3 font-sora text-headline-sm font-bold text-on-surface">
                  {pillar.title}
                </h3>
                <p className="font-jakarta text-body-md text-on-surface-variant">{pillar.body}</p>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-outline-variant/10 pt-4 font-mono text-body-sm text-on-surface">
                <span aria-hidden className={`h-2 w-2 rounded-full ${pillar.dotClass}`} />
                {pillar.footnote}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
