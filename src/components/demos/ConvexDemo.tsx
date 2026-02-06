const GOL_URL = "https://gol.infiniter.tech";

export function ConvexDemo() {
  return (
    <div className="w-full rounded-lg shadow-xl overflow-hidden bg-background border border-border">
      <iframe
        src={GOL_URL}
        title="Convex Game of Life Demo"
        className="w-full border-none"
        style={{ height: "800px", display: "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
