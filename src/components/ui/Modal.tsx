"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** 넓은 콘텐츠(게시판 등)에 사용 */
  size?: "sm" | "lg";
  labelledById: string;
};

/**
 * 닫기 버튼으로만 닫히는 모달.
 *
 * 요구사항에 따라 배경 클릭·ESC로는 닫히지 않습니다.
 * (일반적인 모달 관례와 다르므로 의도적으로 핸들러를 두지 않았습니다.)
 * 대신 포커스가 모달 밖으로 나가지 않도록 트랩을 걸고, 배경 스크롤을 잠급니다.
 */
export function Modal({ open, title, onClose, children, size = "sm", labelledById }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // 열릴 때 첫 포커스 이동, 닫힐 때 원래 위치로 복귀
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      'input, button, select, textarea, [href], [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
    return () => previouslyFocused.current?.focus?.();
  }, [open]);

  // 포커스 트랩 — Tab이 모달 밖으로 빠져나가지 않게 순환시킵니다.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'input, button, select, textarea, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-surface-container-lowest/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
    >
      <div
        ref={panelRef}
        className={`glass-overlay my-auto w-full rounded-xl ${
          size === "lg" ? "max-w-3xl" : "max-w-md"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-outline-variant/20 px-5 py-4 sm:px-6">
          <h2 id={labelledById} className="font-sora text-headline-sm font-bold text-on-surface">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-container/40"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  );
}
