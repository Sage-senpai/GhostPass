export default function AppLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-card rounded-xl" />
        <div className="h-4 w-72 bg-card/60 rounded-lg" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 space-y-3">
            <div className="h-3 w-20 bg-asphalt rounded" />
            <div className="h-7 w-16 bg-asphalt rounded" />
          </div>
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-asphalt rounded-xl" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-28 bg-asphalt rounded" />
                <div className="h-3 w-20 bg-asphalt/60 rounded" />
              </div>
            </div>
            <div className="h-3 w-full bg-asphalt/40 rounded" />
            <div className="h-3 w-3/4 bg-asphalt/40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
