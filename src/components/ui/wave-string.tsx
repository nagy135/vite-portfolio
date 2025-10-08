import { useEffect, useRef, useState } from 'react'

export type WaveStringProps = {
  sections?: number
  height?: number
  className?: string
  lineColor?: string
  lineWidth?: number
  backgroundColor?: string
  // Simulation tuning
  stiffness?: number // attraction to baseline
  coupling?: number // neighbor coupling (tension)
  damping?: number // velocity damping (0..1 per second)
  fixedEnds?: boolean // keep endpoints pinned to baseline
  // Interaction
  impulseStrength?: number // px/sec impulse magnitude applied to velocity
  impulseRadius?: number // radius in points for Gaussian impulse spread
  // Target square
  targetHeight?: number // height of the target square
  targetWidth?: number // width of the target square
  targetColor?: string // color of the target square
  onTargetHit?: () => void // callback when wave hits target top
  hitCooldown?: number // ms cooldown between target hits
}

export function WaveString({
  sections = 120,
  height = 64,
  className,
  lineColor = '#16a34a',
  lineWidth = 2,
  backgroundColor = 'transparent',
  stiffness = 13, // higher -> stronger pull to baseline
  coupling = 220, // higher -> tighter string, faster propagation
  damping = 1.3, // higher -> faster decay
  fixedEnds = true,
  impulseStrength = 320,
  impulseRadius = 10,
  targetHeight = 10,
  targetWidth = 24,
  targetColor = '#0b0b0b',
  onTargetHit,
  hitCooldown = 1500,
}: WaveStringProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | null>(null)

  const [width, setWidth] = useState<number>(0)

  // State stored in refs to avoid re-renders each frame
  const displacementsRef = useRef<number[]>([])
  const velocitiesRef = useRef<number[]>([])
  const lastTargetCheckRef = useRef<number>(0)

  // Target hit effect state
  const targetHitEffectRef = useRef<{
    active: boolean
    startTime: number
    duration: number
    maxRadius: number
  }>({
    active: false,
    startTime: 0,
    duration: 300, // ms
    maxRadius: 40, // px
  })

  // Throttling to prevent hit loops
  const lastHitTimeRef = useRef<number>(0)


  // Resize handling with DPR support
  useEffect(() => {
    function resizeCanvas() {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
      setWidth(rect.width)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    const obs = new ResizeObserver(resizeCanvas)
    if (containerRef.current) obs.observe(containerRef.current)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      obs.disconnect()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [height])

  // Initialize simulation buffers when section count changes
  useEffect(() => {
    const count = Math.max(2, sections)
    displacementsRef.current = new Array(count).fill(0)
    velocitiesRef.current = new Array(count).fill(0)
  }, [sections])

  // Animation loop with semi-implicit Euler integration
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    let prevMs = performance.now()

    const draw = (nowMs: number) => {
      if (!running) return
      const dt = Math.min(0.033, Math.max(0.001, (nowMs - prevMs) / 1000))
      prevMs = nowMs

      const baselineY = Math.floor(height / 2)
      const pointCount = Math.max(2, sections)
      const sectionWidth = width / (pointCount - 1)

      const y = displacementsRef.current
      const v = velocitiesRef.current

      // Build accelerations from forces
      // Force = -stiffness * y[i] (to baseline)
      //       + coupling * (y[i-1] - 2*y[i] + y[i+1]) (discrete Laplacian)
      //       - damping * v[i]
      // mass = 1
      const accelerations: number[] = new Array(pointCount)

      for (let i = 0; i < pointCount; i += 1) {
        let laplacian = 0
        if (i > 0) laplacian += y[i - 1] - y[i]
        if (i < pointCount - 1) laplacian += y[i + 1] - y[i]
        const springForce = -stiffness * y[i]
        const couplingForce = coupling * laplacian
        const dampingForce = -damping * v[i]
        const a = springForce + couplingForce + dampingForce
        accelerations[i] = a
      }

      // Enforce fixed ends by zeroing their acceleration/velocity and displacement to baseline
      if (fixedEnds) {
        accelerations[0] = 0
        accelerations[pointCount - 1] = 0
        y[0] = 0
        y[pointCount - 1] = 0
        v[0] = 0
        v[pointCount - 1] = 0
      }

      // Integrate (semi-implicit Euler)
      for (let i = 0; i < pointCount; i += 1) {
        v[i] += accelerations[i] * dt
        y[i] += v[i] * dt
      }


      // Clear
      ctx.fillStyle = backgroundColor
      if (backgroundColor !== 'transparent') {
        ctx.fillRect(0, 0, width, height)
      } else {
        ctx.clearRect(0, 0, width, height)
      }

      // Draw polyline
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = lineColor
      ctx.moveTo(0, baselineY + y[0])
      for (let i = 1; i < pointCount; i += 1) {
        ctx.lineTo(i * sectionWidth, baselineY + y[i])
      }
      ctx.stroke()

      // Draw target square on the right side
      const targetX = width - 10 * targetWidth
      const targetY = baselineY - targetHeight / 2

      ctx.fillStyle = targetColor
      ctx.fillRect(targetX, targetY, targetWidth, targetHeight)

      // Draw target hit effect (expanding circle)
      if (targetHitEffectRef.current.active) {
        const effect = targetHitEffectRef.current
        const elapsed = nowMs - effect.startTime
        const progress = Math.min(1, elapsed / effect.duration)

        if (progress >= 1) {
          effect.active = false
        } else {
          // Easing function for smooth expansion
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          const radius = effect.maxRadius * easedProgress
          const alpha = 1 - progress

          const centerX = targetX + targetWidth / 2
          const centerY = targetY + targetHeight / 2

          ctx.save()
          ctx.globalAlpha = alpha
          ctx.strokeStyle = '#ff6b6b'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
      }

      // Check if wave hits target top edge
      if (onTargetHit && nowMs - lastTargetCheckRef.current > 16) { // Check every ~16ms
        lastTargetCheckRef.current = nowMs

        // Find the point closest to the target area
        const targetCenterX = targetX + targetWidth / 2
        const targetIndex = Math.max(0, Math.min(pointCount - 1, Math.round(targetCenterX / sectionWidth)))

        // Check if wave displacement at target position exceeds target top
        const waveY = baselineY + y[targetIndex]
        const targetTop = targetY

        if (waveY <= targetTop) {
          // Check throttling - only trigger if enough time has passed
          const timeSinceLastHit = nowMs - lastHitTimeRef.current
          if (timeSinceLastHit >= hitCooldown) {
            // Update last hit time
            lastHitTimeRef.current = nowMs

            // Trigger hit effect
            targetHitEffectRef.current.active = true
            targetHitEffectRef.current.startTime = nowMs

            // Apply impulse to string at target position (original behavior)
            const impulseRadius = 8
            const sigma = impulseRadius / 2
            for (let i = Math.max(0, targetIndex - impulseRadius); i <= Math.min(pointCount - 1, targetIndex + impulseRadius); i += 1) {
              const d = i - targetIndex
              const gaussian = Math.exp(-(d * d) / (2 * sigma * sigma))
              velocitiesRef.current[i] -= impulseStrength * 0.5 * gaussian // Half strength for target hit
            }

            onTargetHit()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    }
  }, [width, height, sections, lineColor, lineWidth, backgroundColor, stiffness, coupling, damping, fixedEnds, targetHeight, targetWidth, targetColor, onTargetHit])

  // Click handler applies an upward Gaussian impulse to velocities
  const onClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = evt.clientX - rect.left

    const pointCount = Math.max(2, sections)
    const sectionWidth = width / (pointCount - 1)
    const centerIndex = Math.max(0, Math.min(pointCount - 1, Math.round(x / sectionWidth)))

    const radiusPoints = Math.max(0, Math.floor(impulseRadius))
    const sigma = Math.max(1, radiusPoints) / 2

    for (let i = Math.max(0, centerIndex - radiusPoints); i <= Math.min(pointCount - 1, centerIndex + radiusPoints); i += 1) {
      const d = i - centerIndex
      const gaussian = Math.exp(-(d * d) / (2 * sigma * sigma))
      // Canvas y increases downward; negative velocity goes upward
      velocitiesRef.current[i] -= impulseStrength * gaussian
    }
  }

  return (
    <div ref={containerRef} className={className} style={{ height }}>
      <canvas ref={canvasRef} onClick={onClick} aria-label="Wave string canvas" />
    </div>
  )
}
