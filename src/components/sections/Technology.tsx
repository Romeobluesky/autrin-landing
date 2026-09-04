import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SECTION_IDS } from "@/lib/sections";

const FEATURES = [
  {
    icon: "lock",
    tone: "text-tertiary",
    body: (
      <>
        <strong>Human-in-the-Loop</strong> 개인정보 원천 격리 시스템
      </>
    ),
  },
  {
    icon: "toggle_on",
    tone: "text-primary",
    body: <>작업 가능 / 마감 상태를 1초 만에 전환하는 퀵 컨트롤러</>,
  },
  {
    icon: "insights",
    tone: "text-secondary",
    body: <>입고 차종 통계 및 단골 정비 주기 리텐션 자동 분석</>,
  },
];

const METRICS = [
  { label: "금일 승인 오더", value: "14", unit: " 건", valueClass: "text-on-surface" },
  { label: "평균 매칭 전환율", value: "78.4", unit: " %", valueClass: "text-tertiary" },
  { label: "월 예상 정산액", value: "₩18.2M", unit: "", valueClass: "text-secondary" },
];

const ORDERS = [
  {
    icon: "directions_car",
    iconWrap: "bg-primary-container/20 text-primary",
    title: "제네시스 G80 (2022) - 하체 소음 및 브레이크 패드 교체",
    meta: "고객 요청 희망일: 내일 오전 10:00 · 성남 분당구 정자동",
  },
  {
    icon: "electric_bolt",
    iconWrap: "bg-tertiary/20 text-tertiary",
    title: "아이오닉 5 - 고전압 배터리 냉각수 순환 진단",
    meta: "AI 진단 코드: DTC-P0A93 · 예상 정밀 진단 2시간",
  },
];

export function Technology() {
  return (
    <section id={SECTION_IDS.technology} className="w-full bg-surface py-20 md:py-section-md">
      <Container>
        <div className="grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
          {/* 카피 */}
          <div id="technology-copy" className="flex flex-col items-start gap-4 lg:col-span-5">
            <span className="rounded bg-surface-container-high px-3 py-1 font-mono text-label-code text-primary">
              TYPE 1 CRM WEB CONSOLE
            </span>
            <h2 className="font-sora text-headline-lg-mobile font-bold text-on-surface md:text-headline-lg">
              지역 사업자의
              <br />
              디지털 전환을 돕는
              <br />
              <span className="text-tertiary">강력하고 안전한 무기</span>
            </h2>
            <p className="font-jakarta text-body-lg text-on-surface-variant">
              복잡한 전산 프로그램은 필요 없습니다. 스마트폰과 PC 어디서나 원터치로 작업 상태를
              토글하고, 매칭 현황과 정산 일정을 직관적으로 관리하는 스마트 CRM 웹 콘솔을 무상
              제공합니다.
            </p>

            <ul className="w-full space-y-3 pt-2 font-jakarta text-body-md text-on-surface">
              {FEATURES.map((feature) => (
                <li
                  key={feature.icon}
                  className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3"
                >
                  <Icon name={feature.icon} className={feature.tone} />
                  <span>{feature.body}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 대시보드 목업 */}
          <div className="lg:col-span-7">
            <div
              id="technology-dashboard-mockup"
              className="glass-card space-y-6 rounded-xl p-4 md:p-6"
            >
              {/* 콘솔 헤더 */}
              <div className="flex flex-col gap-3 border-b border-outline-variant/20 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-3 w-3 rounded-full bg-error" />
                  <span aria-hidden className="h-3 w-3 rounded-full bg-tertiary" />
                  <span aria-hidden className="h-3 w-3 rounded-full bg-secondary" />
                  <span className="ml-2 font-mono text-label-code text-on-surface-variant">
                    AUTRIN PARTNER CONSOLE // v2.4-CONNECTED
                  </span>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded bg-tertiary/20 px-3 py-1 font-mono text-label-badge text-tertiary">
                  <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
                  LIVE ON AIR
                </span>
              </div>

              {/* 미니 지표 */}
              <div id="technology-dashboard-metrics" className="grid grid-cols-3 gap-3">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl bg-surface-container-lowest p-3 md:p-4"
                  >
                    <div className="font-jakarta text-body-sm text-on-surface-variant">
                      {metric.label}
                    </div>
                    <div
                      className={`mt-1 font-sora text-headline-sm font-bold ${metric.valueClass}`}
                    >
                      {metric.value}
                      {metric.unit ? (
                        <span className="text-xs font-normal text-primary">{metric.unit}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* 실시간 수주 큐 */}
              <div id="technology-dashboard-queue" className="space-y-3">
                <div className="font-mono text-label-code uppercase text-on-surface-variant">
                  실시간 수주 및 정비 매칭 큐레이션
                </div>
                {ORDERS.map((order) => (
                  <div
                    key={order.title}
                    className="flex flex-col gap-3 rounded-xl bg-surface-container p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${order.iconWrap}`}
                      >
                        <Icon name={order.icon} className="text-lg" />
                      </div>
                      <div>
                        <div className="font-sora text-body-md font-bold text-on-surface">
                          {order.title}
                        </div>
                        <div className="font-mono text-body-sm text-on-surface-variant">
                          {order.meta}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                      <span className="rounded bg-primary px-3 py-1.5 font-jakarta text-body-sm font-semibold text-on-primary">
                        승인하기
                      </span>
                      <span className="rounded bg-surface-container-high px-3 py-1.5 font-jakarta text-body-sm text-on-surface-variant">
                        조율
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 유입 인덱스 스파크라인 */}
              <div id="technology-dashboard-sparkline" className="rounded-xl bg-surface-container-lowest p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-body-sm text-on-surface-variant">
                    주간 고객 유효 유입 인덱스
                  </span>
                  <span className="font-mono text-label-code text-primary">+28.5% WoW</span>
                </div>
                <svg
                  viewBox="0 0 500 60"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="h-12 w-full text-primary"
                >
                  <path
                    d="M0,45 C70,40 120,50 180,25 C240,5 310,35 380,18 C430,8 470,22 500,10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,45 C70,40 120,50 180,25 C240,5 310,35 380,18 C430,8 470,22 500,10 L500,60 L0,60 Z"
                    fill="currentColor"
                    fillOpacity="0.08"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
