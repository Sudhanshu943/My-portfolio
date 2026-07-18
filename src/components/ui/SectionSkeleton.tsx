type SectionSkeletonProps = {
  label?: string;
};

/** Lightweight placeholder while a below-the-fold client section loads. */
export default function SectionSkeleton({ label = 'Loading section' }: SectionSkeletonProps) {
  return (
    <div className="py-20 md:py-[120px] bg-surface-container-low/40 px-6" aria-busy="true">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-3 w-40 bg-surface-container-high rounded" />
        <div className="h-8 w-72 max-w-full bg-surface-container-high rounded" />
        <p className="font-mono-tactical text-xs text-on-surface-variant">{label}…</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-surface-container-high rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
