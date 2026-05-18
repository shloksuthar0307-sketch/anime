export default function SkeletonCard() {
  return (
    <div className="rounded-card overflow-hidden glass-card">
      <div className="aspect-[3/4] skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="h-3 w-1/2 skeleton rounded" />
        <div className="h-3 w-1/3 skeleton rounded" />
      </div>
    </div>
  );
}
