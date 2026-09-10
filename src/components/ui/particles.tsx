import { useEffect, useRef } from "react"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
  paused?: boolean
}

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
  dx: number
  dy: number
}

export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color,
  vx = 0,
  vy = 0,
  paused = false,
  ...props
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !container || !context) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame = 0
    let offsetX = 0
    let offsetY = 0
    let targetX = 0
    let targetY = 0
    let particleColor = color ?? "#566779"

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = particleColor
      particles.forEach((particle) => {
        context.globalAlpha = particle.opacity
        context.beginPath()
        context.arc(particle.x + offsetX, particle.y + offsetY, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 1
    }

    const animate = () => {
      offsetX += (targetX - offsetX) / Math.max(1, ease)
      offsetY += (targetY - offsetY) / Math.max(1, ease)
      particles.forEach((particle) => {
        particle.x = (particle.x + particle.dx + vx + width) % Math.max(1, width)
        particle.y = (particle.y + particle.dy + vy + height) % Math.max(1, height)
      })
      draw()
      frame = requestAnimationFrame(animate)
    }

    const restart = () => {
      cancelAnimationFrame(frame)
      draw()
      if (!motion.matches && !paused && document.visibilityState !== "hidden")
        frame = requestAnimationFrame(animate)
    }

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: Math.max(0, quantity) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.max(0.1, size + Math.random()),
        opacity: 0.1 + Math.random() * 0.5,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
      }))
      restart()
    }

    const updateColor = () => {
      particleColor =
        color ?? (document.documentElement.classList.contains("dark") ? "#ffffff" : "#566779")
      draw()
    }

    const onMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect()
      targetX = (event.clientX - bounds.left - width / 2) / Math.max(1, staticity)
      targetY = (event.clientY - bounds.top - height / 2) / Math.max(1, staticity)
    }

    const resizeObserver = new ResizeObserver(resize)
    const themeObserver = new MutationObserver(updateColor)
    resizeObserver.observe(container)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    updateColor()
    resize()
    window.addEventListener("mousemove", onMouseMove)
    motion.addEventListener("change", restart)
    document.addEventListener("visibilitychange", restart)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      motion.removeEventListener("change", restart)
      document.removeEventListener("visibilitychange", restart)
    }
  }, [quantity, staticity, ease, size, refresh, color, vx, vy, paused])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}

Particles.displayName = "Particles"
