type Props = {
  current: number;
  total: number;
  label: string;
};

export function ProgressBar({ current, total, label }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div className="rounded-[12px] border border-border bg-surface p-4 shadow-card" role="status" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-medium">{label}</p>
        <p className="font-mono text-xs text-muted tabular-nums">
          {current} of {total}
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg">
        <div className="h-full rounded-full bg-accent transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
