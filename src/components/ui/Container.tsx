import type { ReactNode } from "react";

/** 디자인 그리드 규격: max-width 1280px, 모바일 20px / 데스크톱 40px 세이프 패딩 */
export function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-container px-5 md:px-8 lg:px-gutter-xl ${className}`}
    >
      {children}
    </div>
  );
}
