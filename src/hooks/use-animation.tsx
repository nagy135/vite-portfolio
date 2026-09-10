import { useEffect, useRef } from "react"

export function useAnimationFrame(callback: (deltaTime: number) => void, ms: number) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let previousTime: number | undefined
    let elapsed = 0

    const animate = (time: number) => {
      if (previousTime !== undefined) {
        elapsed += time - previousTime
        if (elapsed >= ms) {
          callbackRef.current(elapsed)
          elapsed = 0
        }
      }
      previousTime = time
      frame = requestAnimationFrame(animate)
    }

    const updateMotion = () => {
      cancelAnimationFrame(frame)
      previousTime = undefined
      elapsed = 0
      if (!motionPreference.matches) frame = requestAnimationFrame(animate)
    }

    updateMotion()
    motionPreference.addEventListener("change", updateMotion)
    return () => {
      cancelAnimationFrame(frame)
      motionPreference.removeEventListener("change", updateMotion)
    }
  }, [ms])
}
