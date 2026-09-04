import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/lib/sections";

type Tone = "primary" | "tertiary" | "secondary";

const TONE_TEXT: Record<Tone, string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  secondary: "text-secondary",
};

const CATEGORIES: {
  id: string;
  code: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
  tone: Tone;
}[] = [
  {
    id: "ecosystem-card-01",
    code: "01 / TRANSACTION",
    title: "신·중고차",
    description:
      "정밀 상태 리포트와 블록체인 이력 기반 인증 거래를 연계하여 투명한 딜러 파트너십 형성.",
    highlight: "인증 매물 큐레이션",
    icon: "/icons/used-car.png",
    tone: "primary",
  },
  {
    id: "ecosystem-card-02",
    code: "02 / DIAGNOSTIC & REPAIR",
    title: "정비",
    description:
      "단가 후려치기 없는 표준 공임 보장. 정밀 스캔 데이터 기반의 고난도 정비 오더 직결.",
    highlight: "정비 권한 100% 자율",
    icon: "/icons/maintenance.png",
    tone: "tertiary",
  },
  {
    id: "ecosystem-card-03",
    code: "03 / DETAILING & CARE",
    title: "카케어",
    description:
      "광택, 틴팅, 랩핑, 가죽 복원 등 특화 시공 브랜드의 장인 기술을 합당한 가치로 제안.",
    highlight: "프리미엄 세그먼트 매칭",
    icon: "/icons/car-care.png",
    tone: "secondary",
  },
  {
    id: "ecosystem-card-04",
    code: "04 / INSURANCE & CAPITAL",
    title: "보험·금융",
    description:
      "차량 운행·정비 이력 데이터와 연동된 다이렉트 보상 처리 및 맞춤형 워런티 금융 연대.",
    highlight: "클레임 간소화 API",
    icon: "/icons/insurance-finance.png",
    tone: "primary",
  },
  {
    id: "ecosystem-card-05",
    code: "05 / MOBILITY LOGISTICS",
    title: "렌트·탁송",
    description:
      "정비·사고 대차와 실시간 탁송 플릿을 연결하여 대기 시간을 최소화하는 온디맨드 물류망.",
    highlight: "동적 디스패치 파이프라인",
    icon: "/icons/rental-delivery.png",
    tone: "tertiary",
  },
  {
    id: "ecosystem-card-06",
    code: "06 / OEM & AFTERPARTS",
    title: "제조·유통",
    description:
      "순정품 및 인증 대체부품의 중간 유통 마진을 절감하고 실시간 재고를 파트너에 직공급.",
    highlight: "부품 직발주 도매 연계",
    icon: "/icons/manufacturing-distribution.png",
    tone: "secondary",
  },
  {
    id: "ecosystem-card-07",
    code: "07 / CIRCULAR ECONOMY",
    title: "재활용",
    description:
      "배터리 잔존가치 평가 및 친환경 부품 리퍼비시 순환 인프라로 지속가능 수익 창출.",
    highlight: "ESG 리사이클 트래킹",
    icon: "/icons/recycling.png",
    tone: "primary",
  },
  {
    id: "ecosystem-card-08",
    code: "08 / END-OF-LIFE DECOMMISSION",
    title: "폐차",
    description:
      "말소 등록 자동화와 잔존 자원 가치 극대화로 해체 파트너의 합법적·안정적 마진 확보.",
    highlight: "스마트 말소 원스톱",
    icon: "/icons/scrapping.png",
    tone: "tertiary",
  },
];

export function Ecosystem() {
  return (
    <section
      id={SECTION_IDS.ecosystem}
      className="w-full bg-surface-container-lowest py-20 md:py-section-md"
    >
      <Container>
        {/* maxWidth: 데스크톱에서 제목이 한 줄로 떨어지도록 기본 폭(max-w-3xl)보다 넓게 잡습니다.
            모바일에서는 폰트가 작아져(28px) 자연스럽게 줄바꿈됩니다. */}
        <SectionHeading
          eyebrow="Connected Cycle Architecture"
          maxWidth="max-w-5xl"
          title="AUTRIN이 연결하는 모빌리티 전 주기 생태계"
          description="분절된 서비스를 하나의 신뢰 아치(Trust Arch)로 통합합니다"
          className="mb-16"
        />

        <div
          id="ecosystem-grid"
          className="grid grid-cols-1 gap-gutter-md sm:grid-cols-2 lg:grid-cols-4"
        >
          {CATEGORIES.map((category) => (
            <article
              key={category.id}
              id={category.id}
              className="glass-card glass-card-hover group relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest p-2.5 shadow-inner transition-transform group-hover:scale-105">
                <Image
                  src={category.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="icon-tint h-full w-full object-contain"
                />
              </div>

              <div className={`mb-1 font-mono text-label-code ${TONE_TEXT[category.tone]}`}>
                {category.code}
              </div>
              <h3 className="mb-2 font-sora text-headline-sm font-bold text-on-surface">
                {category.title}
              </h3>
              <p className="mb-4 flex-1 font-jakarta text-body-sm text-on-surface-variant">
                {category.description}
              </p>

              <div
                className={`flex items-center justify-between border-t border-outline-variant/10 pt-3 font-jakarta text-body-sm font-semibold ${TONE_TEXT[category.tone]}`}
              >
                <span>{category.highlight}</span>
                <Icon
                  name="arrow_forward"
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
