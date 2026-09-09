const CAR_URL = 'https://car.infiniter.tech'

export function CarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-white shadow-xl">
      <div className="h-[240px] w-full overflow-hidden sm:h-[385px] lg:h-[700px]">
        <iframe
          src={CAR_URL}
          title="Car Demo"
          className="block h-[700px] w-[175%] origin-top-left scale-[0.5714] border-none sm:w-[125%] sm:scale-[0.8] lg:w-full lg:scale-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  )
}
