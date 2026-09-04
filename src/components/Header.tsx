"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { NAV_ITEMS, SECTION_IDS, anchor } from "@/lib/sections";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(SECTION_IDS.hero);

  // 스크롤 진행에 따라 헤더 배경 강도 전환
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 현재 화면에 보이는 섹션을 네비게이션에 반영 (Scroll Spy)
  useEffect(() => {
    const targets = NAV_ITEMS.map(({ key }) =>
      document.getElementById(SECTION_IDS[key]),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      id={SECTION_IDS.header}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || menuOpen
          ? "glass-overlay"
          : "border-b border-transparent bg-surface-container-lowest/60 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-container items-center justify-between gap-gutter-md px-5 md:px-8 lg:px-gutter-xl">
        {/* 브랜드 */}
        <div className="flex items-center gap-gutter-md" id="header-brand-container">
          <a
            href={anchor("hero")}
            className="group flex items-center gap-gutter-sm"
            aria-label="AUTRIN 홈으로 이동"
          >
            <Image
              src="/logo/autrin-wordmark.png"
              alt="AUTRIN"
              width={400}
              height={91}
              priority
              className="h-8 w-auto object-contain transition-opacity group-hover:opacity-85 md:h-9"
            />
          </a>
          <span className="hidden items-center rounded border border-outline-variant/30 bg-surface-container-high px-gutter-xs py-0.5 font-mono text-label-code text-tertiary xl:inline-flex">
            B2B Mobility Core
          </span>
        </div>

        {/* 데스크톱 네비게이션 */}
        <nav
          id="header-main-nav"
          aria-label="주요 섹션"
          className="hidden items-center gap-gutter-xs lg:flex xl:gap-gutter-sm"
        >
          {NAV_ITEMS.map(({ label, key }) => {
            const isActive = activeId === SECTION_IDS[key];
            return (
              <a
                key={key}
                href={anchor(key)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-xl px-gutter-sm py-2 font-jakarta text-body-md transition-colors ${
                  isActive
                    ? "bg-surface-container-high font-semibold text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* 액션 */}
        <div className="flex items-center gap-gutter-sm" id="header-actions-container">
          <a
            id="cta-join-membership"
            href={anchor("contact")}
            className="hidden items-center justify-center rounded-xl bg-secondary-container px-gutter-lg py-2.5 font-sora text-body-md font-semibold text-on-secondary-container shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-200 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_28px_rgba(90,154,228,0.5)] sm:inline-flex"
          >
            오토멤버십 문의하기
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="header-mobile-nav"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-high/60 text-on-surface transition-colors hover:bg-surface-container-high lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      <nav
        id="header-mobile-nav"
        aria-label="모바일 주요 섹션"
        hidden={!menuOpen}
        className="border-t border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-container flex-col gap-1 px-5 py-4 md:px-8">
          {NAV_ITEMS.map(({ label, key }) => (
            <li key={key}>
              <a
                href={anchor(key)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 font-jakarta text-body-lg text-on-surface transition-colors hover:bg-surface-container-high"
              >
                {label}
                <Icon name="chevron_right" className="text-lg text-on-surface-variant" />
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={anchor("contact")}
              onClick={() => setMenuOpen(false)}
              className="flex h-14 items-center justify-center rounded-xl bg-secondary-container font-sora text-body-lg font-bold text-on-secondary-container"
            >
              오토멤버십 문의하기
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
