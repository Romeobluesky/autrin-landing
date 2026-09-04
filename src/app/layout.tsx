import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/**
 * OG 이미지 등 절대 URL의 기준 도메인.
 * 실제 서비스 도메인이 다르면 서버 환경변수 SITE_URL 로 덮어쓰세요.
 */
const SITE_URL = process.env.SITE_URL ?? "https://autrin.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AUTRIN - 통제받지 않는 전문성, 모빌리티 생태계의 새로운 연결 기준",
  description:
    "단방향 가격 경쟁은 끝났습니다. AUTRIN은 파트너 주권 100%를 보장하는 상생 생태계로 정비·신중고차·카케어 등 애프터마켓 전문 사업자를 연결합니다. 입점비·등록비 0원.",
  keywords: [
    "AUTRIN",
    "오트린",
    "모빌리티 애프터마켓",
    "정비 플랫폼",
    "오토멤버십",
    "파트너 제휴",
    "AI 오토매칭",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "AUTRIN",
    title: "AUTRIN - 모빌리티 생태계의 새로운 연결 기준",
    description:
      "인간 주도형 기술과 상생 생태계로 구현하는 애프터마켓의 미래. 비용 0, 기회 무한.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#001230",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`dark ${sora.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* 아이콘 폰트 요청을 앞당겨 리거처 글자가 보이는 구간을 줄입니다. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* 아이콘 폰트(Material Symbols)는 next/font 대상이 아니므로 직접 로드합니다.
            App Router의 root layout에 두면 전 페이지에 적용되므로 아래 규칙은 해당 없음.

            display=block: swap이면 로드 전 "check_circle" 같은 글자가 그대로 보입니다.
            block은 그 구간 동안 글자를 숨기므로 깜빡임이 없습니다.
            (차지하는 공간은 globals.css의 1em 고정 박스가 이미 잡아둡니다) */}
        {/* google-font-display 규칙은 본문 폰트 기준입니다. 본문은 글자가 안 보이면
            문제지만, 아이콘 리거처 폰트는 로드 전에 "check_circle" 같은 단어가
            그대로 노출되는 쪽이 훨씬 나쁘므로 block이 올바른 선택입니다. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-screen bg-surface font-jakarta text-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
