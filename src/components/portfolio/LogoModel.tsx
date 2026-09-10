import { useMemo } from "react"
import { Edges } from "@react-three/drei"
import { Shape } from "three"

interface LogoModelProps {
  rotation: number
}

// The two silhouettes from Viktor's existing logo, in its original coordinate space.
const outlines = [
  [
    [15.45, 13.58],
    [22.92, 13.58],
    [31.72, 27.68],
    [27.95, 33.59],
  ],
  [
    [30.41, 13.58],
    [40.4, 13.58],
    [35.41, 21.63],
  ],
] as const

export function LogoModel({ rotation }: LogoModelProps) {
  const shapes = useMemo(
    () =>
      outlines.map((outline) => {
        const shape = new Shape()
        outline.forEach(([x, y], index) => {
          const px = (x - 27.925) * 0.15
          const py = (23.585 - y) * 0.15
          if (index === 0) shape.moveTo(px, py)
          else shape.lineTo(px, py)
        })
        shape.closePath()
        return shape
      }),
    [],
  )

  return (
    <group rotation={[0, rotation, 0]}>
      {shapes.map((shape, index) => (
        <mesh key={index} position={[0, 0, -0.22]}>
          <extrudeGeometry
            args={[
              shape,
              {
                depth: 0.44,
                bevelEnabled: true,
                bevelSize: 0.018,
                bevelThickness: 0.018,
                bevelSegments: 2,
                steps: 1,
              },
            ]}
          />
          <meshStandardMaterial
            attach="material-0"
            color="#ffffff"
            metalness={0.08}
            roughness={0.35}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#8c9caa"
            metalness={0.35}
            roughness={0.32}
          />
          <Edges color="#24313c" threshold={35} />
        </mesh>
      ))}
    </group>
  )
}

LogoModel.displayName = "LogoModel"
