import { Euler, Quaternion, Vector3 } from "three"

// Azimuth and elevation relative to the fixed camera, not to the rotating logo.
const azimuth = Math.PI / 4
const elevation = 20 * Math.PI / 180
export const scanNormal = new Vector3(
  Math.sin(azimuth) * Math.cos(elevation),
  Math.sin(elevation),
  Math.cos(azimuth) * Math.cos(elevation),
)
export const initialLogoOrientation = new Quaternion().setFromEuler(
  new Euler(0.22, -0.58, -0.12),
)

const outlines = [
  [[15.45, 13.58], [22.92, 13.58], [31.72, 27.68], [27.95, 33.59]],
  [[30.41, 13.58], [40.4, 13.58], [35.41, 21.63]],
]

export const logoSolids = outlines.map((outline) => {
  const count = outline.length
  const vertices = [-0.825, 0.825].flatMap((z) =>
    outline.map(([x, y]) => new Vector3((x - 27.925) * 0.15, (23.585 - y) * 0.15, z)),
  )
  const edges = outline.flatMap((_, index): [number, number][] => [
    [index, (index + 1) % count],
    [index + count, (index + 1) % count + count],
    [index, index + count],
  ])
  return { vertices, edges }
})

// A fixed travel range keeps the scan plane stationary while the object rotates.
export const scanExtent = Math.max(...logoSolids.flatMap(({ vertices }) =>
  vertices.map((vertex) => vertex.length()),
))

// Each logo piece is a convex prism. Its edge/plane intersections form one
// convex polygon; sorting within the plane closes the actual cross-section.
export function intersectSlice(
  vertices: Vector3[],
  edges: [number, number][],
  normal: Vector3,
  distance: number,
): Vector3[] {
  const epsilon = 1e-7
  const points: Vector3[] = []
  const addPoint = (point: Vector3) => {
    if (!points.some((existing) => existing.distanceToSquared(point) < epsilon * epsilon)) {
      points.push(point)
    }
  }

  for (const [start, end] of edges) {
    const a = vertices[start]
    const b = vertices[end]
    const da = a.dot(normal) - distance
    const db = b.dot(normal) - distance
    if (Math.abs(da) < epsilon) addPoint(a.clone())
    if (Math.abs(db) < epsilon) addPoint(b.clone())
    if ((da < -epsilon && db > epsilon) || (da > epsilon && db < -epsilon)) {
      addPoint(a.clone().lerp(b, da / (da - db)))
    }
  }

  if (points.length < 3) return []
  const center = points.reduce((sum, point) => sum.add(point), new Vector3())
    .divideScalar(points.length)
  const reference = Math.abs(normal.y) < 0.9 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
  const horizontal = reference.cross(normal).normalize()
  const vertical = normal.clone().cross(horizontal)
  const angle = (point: Vector3) => {
    const relative = point.clone().sub(center)
    return Math.atan2(relative.dot(vertical), relative.dot(horizontal))
  }
  points.sort((a, b) => angle(a) - angle(b))
  return [...points, points[0]]
}
