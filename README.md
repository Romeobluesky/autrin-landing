# autrin-landing

오트린(AUTRIN) 랜딩페이지 — Next.js 16 (App Router) + TypeScript + Tailwind CSS

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## 섹션 ID 맵

수정 요청 시 아래 ID로 위치를 지정해주세요. 모든 ID는
[src/lib/sections.ts](src/lib/sections.ts)에 정의되어 있고, 헤더·푸터 네비게이션이
같은 값을 참조하므로 앵커가 어긋나지 않습니다.

| # | 섹션 ID | 내용 | 파일 |
|---|---------|------|------|
| — | `global-header` | 고정 헤더 / GNB | [Header.tsx](src/components/Header.tsx) |
| 1 | `hero-section` | 도입부 메인 카피 + KPI 바 | [Hero.tsx](src/components/sections/Hero.tsx) |
| 2 | `ecosystem-section` | 8개 카테고리 생태계 그리드 | [Ecosystem.tsx](src/components/sections/Ecosystem.tsx) |
| 3 | `problem-section` | 문제 제기 / 기존 플랫폼 대비 비교 | [Problem.tsx](src/components/sections/Problem.tsx) |
| 4 | `solution-section` | 핵심 가치 3 Pillar | [Solution.tsx](src/components/sections/Solution.tsx) |
| 5 | `technology-section` | CRM 웹 콘솔 (기술과 신뢰) | [Technology.tsx](src/components/sections/Technology.tsx) |
| 6 | `bottom-cta-section` | 최종 전환 CTA | [BottomCta.tsx](src/components/sections/BottomCta.tsx) |
| 7 | `contact-form-section` | 파트너 문의 폼 | [ContactForm.tsx](src/components/sections/ContactForm.tsx) |
| — | `global-footer` | 푸터 | [Footer.tsx](src/components/Footer.tsx) |

### 섹션 내부 세부 ID

| 섹션 | 하위 ID |
|------|---------|
| Header | `header-brand-container`, `header-main-nav`, `header-mobile-nav`, `header-actions-container`, `cta-join-membership` |
| Hero | `hero-copy`, `hero-visual`, `hero-kpi-bar`, `hero-kpi-01` ~ `hero-kpi-04` |
| Ecosystem | `ecosystem-grid`, `ecosystem-card-01` ~ `ecosystem-card-08` |
| Problem | `problem-visual`, `problem-comparison`, `problem-card-conventional`, `problem-card-autrin` |
| Solution | `solution-grid`, `solution-card-01` ~ `solution-card-03` |
| Technology | `technology-copy`, `technology-dashboard-mockup`, `technology-dashboard-metrics`, `technology-dashboard-queue`, `technology-dashboard-sparkline` |
| Contact | `partner-inquiry-form`, `company-name`, `contact-name`, `phone-number`, `business-category`, `inquiry-message`, `contact-success-panel` |
| Footer | `footer-brand-summary`, `footer-navigation-links`, `footer-contact-info`, `footer-legal-bar` |
| 전역 | `scroll-to-top` — 600px 이상 스크롤 시 우측 하단에 나타나는 맨 위로 버튼 ([ScrollToTop.tsx](src/components/ui/ScrollToTop.tsx)) |

> 고정 헤더(80px) 때문에 앵커 이동 시 제목이 가려지지 않도록
> `globals.css`에서 `[id] { scroll-margin-top: 5rem }`을 적용했습니다.

## 문의 폼 데이터

기획안대로 별도 DB 없이 로컬 JSON 파일에 적재합니다.

- API: `POST /api/inquiry` — [route.ts](src/app/api/inquiry/route.ts)
- 저장 위치: `data/inquiries.json` (배열에 append)
- 검증 규칙은 [src/lib/inquiry.ts](src/lib/inquiry.ts)에서 클라이언트·서버가 공유합니다.
  브라우저 검증을 우회한 요청도 서버에서 동일하게 422로 반려됩니다.
- 개인정보가 담기므로 `data/inquiries.json`은 `.gitignore` 처리했습니다.

## 디자인 시스템

[.docs/stitch_autrim_automotive_website_homepage/DESIGN.md](.docs/stitch_autrim_automotive_website_homepage/DESIGN.md)의
"Autrin Kinetic Dark" 토큰을 [tailwind.config.ts](tailwind.config.ts)에 그대로 옮겼습니다.

- 컬러: `surface-*`, `on-surface-*`, `primary*`, `secondary*`, `tertiary*`, `error*`
- 타이포: `font-sora`(디스플레이/헤드라인), `font-jakarta`(본문), `font-mono`(라벨/코드)
  — 크기는 `text-display-hero`, `text-headline-lg`, `text-body-lg` 등 시맨틱 토큰 사용
- 간격: `gutter-xs` ~ `gutter-xl`, `section-sm` ~ `section-lg`
- 글래스모피즘 유틸리티: `.glass-card`, `.glass-card-hover`, `.glass-overlay`, `.divider-fade`

## 에셋

`.docs`의 샘플 에셋을 `public/`으로 복사해 사용합니다.

| 사용처 | 배포 경로 | 원본 |
|--------|-----------|------|
| 헤더 로고 | `public/logo/autrin-wordmark.png` | `.docs/logo-sample/metallic_4_AUTRIM 1.png` |
| 푸터 로고 | `public/logo/autotrinity-wordmark.png` | `.docs/logo-sample/metallic_2_A_AUTOTRINITY 1.png` |
| 파비콘 | `src/app/icon.png` | `.docs/logo-sample/metallic_1_A_lettermark1.png` |
| Hero 배경 | `public/images/hero-banner.jpg` | `.docs/banner-sample/main_banner002_m.jpg` |
| Problem 이미지 | `public/images/problem-banner.jpg` | `.docs/banner-sample/main_banner003_m.jpg` |
| 카테고리 아이콘 | `public/icons/*.png` | `.docs/icon-sample/*.png` |

- Hero 배경은 좌→우 그라디언트 오버레이(딥네이비 90% → 10%)를 씌워
  왼쪽 카피 가독성을 확보하고 오른쪽으로 갈수록 이미지가 드러나게 했습니다.
  모바일은 카피가 이미지 위 전면에 놓이므로 오버레이를 한 겹 더 얹습니다.
- 카테고리 아이콘 원본이 어두운 단색이라 딥네이비 배경에서 보이지 않으므로
  `globals.css`의 `.icon-tint` 필터로 브랜드 블루로 리컬러합니다.
  (아이콘 이미지 안에 업종명 텍스트가 포함되어 있어 카드 제목과 중복 — 교체 예정)
