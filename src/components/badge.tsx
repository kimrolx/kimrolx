interface BadgeProps {
  label: string;
  color: string;
  textColor?: string;
}

export function Badge({ label, color, textColor }: BadgeProps) {
  return (
    <span
      className={`inline-block  px-2 py-1 text-[11px] font-semibold rounded`}
      style={{ color: textColor ? textColor : '#FFFFFF', backgroundColor: color }}
    >
      {label}
    </span>
  );
}
