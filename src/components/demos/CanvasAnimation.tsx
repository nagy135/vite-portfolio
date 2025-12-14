import { useEffect, useRef } from 'react'
import reactIcon from '/src/assets/icons/react.svg'
import typescriptIcon from '/src/assets/icons/typescript.svg'
import nextjsIcon from '/src/assets/icons/nextjs.svg'

interface SVGItem {
  element: HTMLImageElement | null
  x: number
  y: number
  vx: number
  vy: number
  originalX: number
  originalY: number
}

export function CanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<SVGItem[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const icons = [
      { src: reactIcon, offset: -80 },
      { src: typescriptIcon, offset: 0 },
      { src: nextjsIcon, offset: 80 },
    ]

    itemsRef.current = icons.map((item, idx) => ({
      element: container.children[idx] as HTMLImageElement,
      x: centerX + item.offset,
      y: centerY,
      vx: 0,
      vy: 0,
      originalX: centerX + item.offset,
      originalY: centerY,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const animate = () => {
      const mouse = mouseRef.current
      const damping = 0.92
      const attractionForce = 0.08
      const maxDistance = 150

      itemsRef.current.forEach((item) => {
        if (!item.element) return

        const dx = mouse.x - item.x
        const dy = mouse.y - item.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          item.vx += (dx / distance) * attractionForce
          item.vy += (dy / distance) * attractionForce
        }

        const returnDx = item.originalX - item.x
        const returnDy = item.originalY - item.y
        item.vx += returnDx * 0.02
        item.vy += returnDy * 0.02

        item.vx *= damping
        item.vy *= damping

        item.x += item.vx
        item.y += item.vy

        item.element.style.transform = `translate(${item.x - 24}px, ${item.y - 24}px)`
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] rounded-lg shadow-xl bg-gradient-to-br from-background to-muted/10 overflow-hidden"
    >
      <img src={reactIcon} alt="React" width={48} height={48} className="absolute pointer-events-none" />
      <img src={typescriptIcon} alt="TypeScript" width={48} height={48} className="absolute pointer-events-none" />
      <img src={nextjsIcon} alt="Next.js" width={48} height={48} className="absolute pointer-events-none" />
    </div>
  )
}
