import { useEffect, useMemo, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import { Euler, Quaternion } from "three"
import {
  initialLogoOrientation,
  intersectSlice,
  logoSolids,
  scanExtent,
  scanNormal,
} from "@/lib/logoSlices"

interface LogoModelProps {
  scan: number
  dark: boolean
}

const slices = Array.from({ length: 23 }, (_, index) => (index / 22 - 0.5) * 2 * scanExtent)

export function LogoModel({ scan, dark }: LogoModelProps) {
  const canvas = useThree((state) => state.gl.domElement)
  const [orientation, setOrientation] = useState(() => initialLogoOrientation.clone())
  const ink = dark ? "#d5e3f5" : "#344c67"
  const accent = dark ? "#98f5ee" : "#00756e"
  const distance = (scan - 0.5) * 2 * scanExtent

  useEffect(() => {
    let drag: { id: number; x: number; y: number } | null = null
    const rotate = (x: number, y: number) => {
      const change = new Quaternion().setFromEuler(new Euler(y, x, 0))
      setOrientation((previous) => change.clone().multiply(previous).normalize())
    }
    const start = (event: PointerEvent) => {
      if (event.button !== 0 || drag) return
      event.preventDefault()
      canvas.focus({ preventScroll: true })
      canvas.setPointerCapture(event.pointerId)
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
    }
    const move = (event: PointerEvent) => {
      if (drag?.id !== event.pointerId) return
      const scale = Math.PI * 2 / canvas.clientHeight
      rotate((event.clientX - drag.x) * scale, (event.clientY - drag.y) * scale)
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
    }
    const stop = (event: PointerEvent) => {
      if (drag?.id !== event.pointerId) return
      drag = null
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
    }
    const key = (event: KeyboardEvent) => {
      const steps: Record<string, [number, number]> = {
        ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0],
        ArrowUp: [0, -0.1], ArrowDown: [0, 0.1],
      }
      const step = steps[event.key]
      if (!step) return
      event.preventDefault()
      rotate(...step)
    }
    const previousTabIndex = canvas.tabIndex
    const previousLabel = canvas.getAttribute("aria-label")
    canvas.tabIndex = 0
    canvas.setAttribute("aria-label", "Rotate the logo with dragging or arrow keys. The scan direction stays fixed.")
    canvas.addEventListener("pointerdown", start)
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerup", stop)
    canvas.addEventListener("pointercancel", stop)
    canvas.addEventListener("lostpointercapture", stop)
    canvas.addEventListener("keydown", key)
    return () => {
      canvas.tabIndex = previousTabIndex
      if (previousLabel === null) canvas.removeAttribute("aria-label")
      else canvas.setAttribute("aria-label", previousLabel)
      canvas.removeEventListener("pointerdown", start)
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerup", stop)
      canvas.removeEventListener("pointercancel", stop)
      canvas.removeEventListener("lostpointercapture", stop)
      canvas.removeEventListener("keydown", key)
    }
  }, [canvas])

  const solids = useMemo(() => logoSolids.map(({ vertices, edges }) => ({
    vertices: vertices.map((vertex) => vertex.clone().applyQuaternion(orientation)),
    edges,
  })), [orientation])
  const ghostSlices = useMemo(() => slices.map((offset) => ({
    offset,
    contours: solids.map(({ vertices, edges }) => intersectSlice(vertices, edges, scanNormal, offset)),
  })), [solids])
  const activeSlices = useMemo(() => solids.map(({ vertices, edges }) =>
    intersectSlice(vertices, edges, scanNormal, distance),
  ), [solids, distance])
  const edges = useMemo(() => solids.flatMap((solid) =>
    solid.edges.flatMap(([a, b]) => [solid.vertices[a], solid.vertices[b]]),
  ), [solids])

  return (
    <group>
      <Line points={edges} segments color={ink} lineWidth={0.7} transparent opacity={0.12} depthWrite={false} />
      {ghostSlices.map(({ offset, contours }) => contours.map((points, index) =>
        points.length > 0 && (
          <Line
            key={`${offset}-${index}`}
            points={points}
            color={ink}
            lineWidth={1}
            transparent
            opacity={0.1 + 0.15 * Math.max(0, 1 - Math.abs(offset - distance) / scanExtent)}
            depthWrite={false}
          />
        ),
      ))}
      {activeSlices.map((points, index) => points.length > 0 && (
        <group key={index}>
          <Line
            points={points}
            color={accent}
            lineWidth={8}
            transparent
            opacity={0.07}
            depthWrite={false}
            depthTest={false}
            renderOrder={1}
          />
          <Line
            points={points}
            color={accent}
            lineWidth={2.2}
            depthTest={false}
            renderOrder={2}
          />
        </group>
      ))}
    </group>
  )
}

LogoModel.displayName = "LogoModel"
