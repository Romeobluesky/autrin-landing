type IconProps = {
  name: string;
  className?: string;
};

/** Material Symbols Outlined 래퍼 — 장식용이므로 스크린리더에서는 숨김 */
export function Icon({ name, className = "" }: IconProps) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}
