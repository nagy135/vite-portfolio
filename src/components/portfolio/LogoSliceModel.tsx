import { Line } from "@react-three/drei"
import { logoDepth, logoOutlines } from "@/data/logoData"

interface LogoSliceModelProps {
  scan: number
  dark: boolean
}

// Original logo silhouettes, centered in the same 3D coordinate space.
const outlines = logoOutlines.map((outline) =>
  [...outline, outline[0]].map(([x, y]): [number, number, number] => [
    (x - 27.925) * 0.15,
    (23.585 - y) * 0.15,
    0,
  ]),
)
const slices = Array.from({ length: 15 }, (_, index) => index / 14)

export function LogoSliceModel({ scan, dark }: LogoSliceModelProps) {
  const ink = dark ? "#d5e3f5" : "#344c67"
  const accent = dark ? "#98f5ee" : "#00756e"
  const position = (scan - 0.5) * logoDepth

  return (
    <group>
      {slices.map((slice) => (
        <group key={slice} position={[0, 0, (slice - 0.5) * logoDepth]}>
          {outlines.map((points, index) => (
            <Line
              key={index}
              points={points}
              color={ink}
              lineWidth={1}
              transparent
              opacity={0.1 + 0.15 * Math.max(0, 1 - Math.abs(slice - scan) * 3)}
              depthWrite={false}
            />
          ))}
        </group>
      ))}
      {outlines.flatMap((outline, index) =>
        outline.slice(0, -1).map(([x, y], vertex) => (
          <Line
            key={`${index}-${vertex}`}
            points={[[x, y, -logoDepth / 2], [x, y, logoDepth / 2]]}
            color={ink}
            lineWidth={0.7}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        )),
      )}
      <group position={[0, 0, position]}>
        {outlines.map((points, index) => (
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
    </group>
  )
}

LogoSliceModel.displayName = "LogoSliceModel"
