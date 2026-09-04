import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/lib/sections";

const CONVENTIONAL = [
  {
    title: "최저가 입찰 유도로 인한 마진 붕괴",
    body: "기술료 대신 끝없는 덤핑 경쟁을 강요받아 숙련 인력의 처우가 지속 악화됩니다.",
  },
  {
    title: "비싼 입점료 및 과중한 중개 수수료",
    body: "노출 상단 광고비와 과금 정책으로 정작 실제 정비 작업자의 몫이 착취당합니다.",
  },
  {
    title: "고객과의 직접 소통 차단",
    body: "플랫폼 종속을 위해 데이터를 독점하고 정비 전문가의 작업 소신을 제한합니다.",
  },
];

const AUTRIN_WAY = [
  {
    title: "파트너 주도형 정당한 공임 체계",
    body: "단가 결정권과 기술 자재 선택권을 플랫폼이 간섭하지 않으며 고유 전문성을 보장합니다.",
  },
  {
    title: "입점비·기본 등록비 평생 무료 원칙",
    body: "부당한 고정비 없이 전환된 성과 기반의 투명한 거버넌스를 통해 동반 성장합니다.",
  },
  {
    title: "진성 유효 고객 1:1 오토 매칭",
    body: "가격 떠보기성 체리피커를 사전에 걸러내고 파트너의 스펙에 일치하는 오더만을 라우팅합니다.",
  },
];

export function Problem() {
  return (
    <section
      id={SECTION_IDS.problem}
      className="relative w-full overflow-hidden bg-surface py-20 md:py-section-md"
    >
      <Container className="relative z-10">
        {/* 헤드라인(좌) + 현장 이미지(우) — 기존에 비어 있던 우측 여백을 채웁니다. */}
        <div className="mb-16 grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
          <SectionHeading
            eyebrow="Industry Reality"
            eyebrowTone="error"
            align="left"
            maxWidth="max-w-none"
            title={
              <>
                맹목적인 단가 하락 압박,
                <br />
                언제까지 감내하시겠습니까?
              </>
            }
            description="플랫폼의 극단적 최저가 경쟁 주도로 인해 현장 정보는 단절되고 서비스 품질은 하향 평준화되고 있습니다. 수요자와 공급자를 잇는 도구가 오히려 시장의 가치를 훼손하는 현실, 이제는 바뀌어야 합니다."
            className="lg:col-span-7"
          />

          <figure
            id="problem-visual"
            className="glass-card relative aspect-[16/10] overflow-hidden rounded-xl lg:col-span-5"
          >
            <Image
              src="/images/problem-banner.jpg"
              alt="차량 보닛을 열고 정비 작업 중인 정비사의 손"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {/* 딥네이비 팔레트에 녹아들도록 톤 다운 + 하단 캡션 가독성 확보 */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,18,48,0.95)_0%,rgba(0,18,48,0.45)_45%,rgba(0,18,48,0.25)_100%)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5">
              <Icon name="build" className="text-lg text-error" />
              <span className="font-jakarta text-body-sm font-semibold text-on-surface">
                숙련된 기술이 단가 경쟁에 밀려 제값을 받지 못하는 현장
              </span>
            </figcaption>
          </figure>
        </div>

        {/*
         * 좌우 카드의 1·2·3번째 항목 박스 높이를 서로 맞춥니다.
         *
         * 두 카드는 별개의 DOM 서브트리라 각자 내용에 따라 높이가 제각각이 됩니다.
         * 부모에 행(row)을 4개(헤더 + 항목 3개) 정의하고 카드와 목록이 subgrid로
         * 그 행을 그대로 물려받게 하면, N번째 행 높이 = max(좌측 N번째, 우측 N번째)가
         * 되어 자동으로 정렬됩니다. 고정 높이(px)를 박으면 문구가 바뀌거나 폭이
         * 달라져 줄바꿈이 변할 때 잘리거나 빈 공간이 생기므로 쓰지 않았습니다.
         */}
        <div
          id="problem-comparison"
          className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto] md:gap-y-4"
        >
          {/* 기존 플랫폼 */}
          <div
            id="problem-card-conventional"
            className="rounded-xl bg-surface-container-low p-6 shadow-xl md:row-span-4 md:grid md:grid-rows-subgrid md:p-8"
          >
            <div className="mb-6 flex items-center gap-3 md:mb-0">
              <Icon name="dangerous" className="text-3xl text-error" />
              <div>
                <div className="font-mono text-label-code text-error">CONVENTIONAL PLATFORM</div>
                <h3 className="font-sora text-headline-sm font-bold text-on-surface">
                  기존 플랫폼의 일방적 단가 압박
                </h3>
              </div>
            </div>

            <ul className="space-y-4 font-jakarta text-body-md text-on-surface-variant md:row-span-3 md:grid md:grid-rows-subgrid md:space-y-0">
              {CONVENTIONAL.map((item) => (
                <li
                  key={item.title}
                  className="flex h-full items-start gap-3 rounded-xl bg-surface-container-lowest/60 p-4"
                >
                  <Icon name="close" className="mt-0.5 text-error" />
                  <div>
                    <strong className="block font-semibold text-on-surface">{item.title}</strong>
                    {item.body}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* AUTRIN */}
          <div
            id="problem-card-autrin"
            className="relative overflow-hidden rounded-xl bg-surface-container-high p-6 shadow-2xl md:row-span-4 md:grid md:grid-rows-subgrid md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative z-10 mb-6 flex items-center gap-3 md:mb-0">
              <Icon name="verified_user" className="text-3xl text-tertiary" />
              <div>
                <div className="font-mono text-label-code text-tertiary">
                  AUTRIN TRUST ARCHITECTURE
                </div>
                <h3 className="font-sora text-headline-sm font-bold text-on-surface">
                  AUTRIN의 상생 아치
                </h3>
              </div>
            </div>

            <ul className="relative z-10 space-y-4 font-jakarta text-body-md text-on-surface-variant md:row-span-3 md:grid md:grid-rows-subgrid md:space-y-0">
              {AUTRIN_WAY.map((item) => (
                <li
                  key={item.title}
                  className="flex h-full items-start gap-3 rounded-xl bg-surface-container-lowest/70 p-4"
                >
                  <Icon name="check" className="mt-0.5 text-tertiary" />
                  <div>
                    <strong className="block font-semibold text-on-surface">{item.title}</strong>
                    {item.body}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
