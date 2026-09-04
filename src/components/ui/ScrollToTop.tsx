"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** 이 높이(px)를 넘게 스크롤하면 버튼이 나타납니다. */
const SHOW_AFTER = 600;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll(); // 새로고침으로 중간 위치에서 시작한 경우 대비
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    // 모션 최소화 설정을 쓰는 사용자에게는 부드러운 스크롤을 강요하지 않습니다.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      id="scroll-to-top"
      type="button"
      onClick={toTop}
      aria-label="페이지 맨 위로 이동"
      // 숨겨진 동안에는 포커스도 받지 않도록 tabIndex/pointer-events를 함께 제어합니다.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-high/90 text-on-surface shadow-[0_8px_32px_rgba(0,15,38,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-primary-container/60 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_24px_rgba(90,154,228,0.45)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-container/40 md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrow_upward" className="text-xl md:text-2xl" />
    </button>
  );
}
