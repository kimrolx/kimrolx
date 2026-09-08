import type { ReactNode } from 'react';

type NowGroupRowProps = {
  label: string;
  meta?: string;
  children: ReactNode;
};

export function NowGroupRow({ label, meta, children }: NowGroupRowProps) {
  return (
    <div className="grid gap-6 border-t border-line py-12 first:border-line-2 lg:grid-cols-[12rem_1fr] lg:gap-12">
      <div className="flex flex-col gap-1 pt-1">
        <h3 className="label text-ink-3">{label}</h3>
        {meta && <span className="label text-ink-3">{meta}</span>}
      </div>
      {children}
    </div>
  );
}
