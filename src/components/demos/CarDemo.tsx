const CAR_URL = 'https://car.infiniter.tech'

export function CarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-white shadow-xl">
      <iframe
        src={CAR_URL}
        title="Car Demo"
        className="block h-[700px] w-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}
