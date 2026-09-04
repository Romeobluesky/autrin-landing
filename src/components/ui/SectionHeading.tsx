import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  eyebrowTone?: "primary" | "tertiary" | "error";
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** 제목 줄바꿈 위치를 제어해야 할 때 사용 (기본 max-w-3xl) */
  maxWidth?: string;
  className?: string;
};

const TONE: Record<NonNullable<SectionHeadingProps["eyebrowTone"]>, string> = {
  primary: "bg-surface-container-high text-primary",
  tertiary: "bg-surface-container-high text-tertiary",
  error: "bg-error-container/40 text-error",
};

export function SectionHeading({
  eyebrow,
  eyebrowTone = "primary",
  title,
  description,
  align = "center",
  maxWidth = "max-w-3xl",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${maxWidth} ${
        isCenter ? "mx-auto items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      <span
        className={`rounded-full px-3 py-1 font-mono text-label-code uppercase tracking-widest ${TONE[eyebrowTone]}`}
      >
        {eyebrow}
      </span>
      <h2 className="font-sora text-headline-lg-mobile font-bold text-on-surface md:text-headline-lg">
        {title}
      </h2>
      {description ? (
        <p className="font-jakarta text-body-lg text-on-surface-variant md:text-body-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
