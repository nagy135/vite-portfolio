import { useMemo } from "react"
import { Edges } from "@react-three/drei"
import { Shape } from "three"
import { logoDepth, logoOutlines } from "@/data/logoData"

export function LogoModel() {
  const shapes = useMemo(
    () =>
      logoOutlines.map((outline) => {
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
    <group>
      {shapes.map((shape, index) => (
        <mesh key={index} position={[0, 0, -logoDepth / 2]}>
          <extrudeGeometry
            args={[
              shape,
              {
                depth: logoDepth,
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
