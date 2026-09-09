const GOL_URL = "https://gol.infiniter.tech";

export function ConvexDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-background shadow-xl">
      <div className="h-[252px] w-full overflow-hidden sm:h-[332px] lg:h-[500px]">
        <iframe
          src={GOL_URL}
          title="Convex Game of Life Demo"
          className="block h-[500px] w-[166.6667%] origin-top-left scale-[0.6] border-none sm:w-[125%] sm:scale-[0.8] lg:w-full lg:scale-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
