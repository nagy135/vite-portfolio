export function ConvexDemo() {
  return (
    <div className="w-full h-[500px] rounded-lg shadow-xl overflow-hidden bg-background border border-border">
      <iframe
        src="https://gol.infiniter.tech"
        title="Convex Game of Life Demo"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}
