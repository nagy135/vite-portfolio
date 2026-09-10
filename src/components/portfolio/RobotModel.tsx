import { RoundedBox } from "@react-three/drei"

type Vector3 = [number, number, number]

interface PanelProps {
  size: Vector3
  position?: Vector3
  color?: string
  radius?: number
  metalness?: number
}

const brass = "#dfb363"
const enamel = "#edf1e9"
const graphite = "#273a43"

function Panel({ size, position, color = brass, radius = 0.12, metalness = 0.25 }: PanelProps) {
  return (
    <RoundedBox
      args={size}
      position={position}
      radius={radius}
      smoothness={4}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} metalness={metalness} roughness={0.32} />
    </RoundedBox>
  )
}

interface JointProps {
  position: Vector3
  radius?: number
}

function Joint({ position, radius = 0.17 }: JointProps) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 24, 16]} />
      <meshStandardMaterial color={graphite} metalness={0.4} roughness={0.38} />
    </mesh>
  )
}

interface RobotModelProps {
  rotation: number
}

export function RobotModel({ rotation }: RobotModelProps) {
  return (
    <group rotation={[0, rotation, 0]}>
      {/* A rounded shell surrounds the recessed visor. */}
      <group position={[0, 1.03, 0]} rotation={[0, 0, -0.065]}>
        <Panel size={[1.78, 1.13, 1.05]} radius={0.25} />
        <Panel
          size={[1.63, 0.94, 0.72]}
          position={[0, -0.005, 0.18]}
          color={enamel}
          radius={0.22}
          metalness={0.1}
        />
        <Panel
          size={[1.46, 0.77, 0.48]}
          position={[0, 0.015, 0.4]}
          color="#162c35"
          radius={0.2}
          metalness={0.15}
        />
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, 0.075, 0.65]}>
            <capsuleGeometry args={[0.07, 0.17, 8, 20]} />
            <meshStandardMaterial
              color="#b9f6eb"
              emissive="#80dacd"
              emissiveIntensity={0.8}
              roughness={0.25}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.12, 0.656]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.13, 0.018, 12, 32, Math.PI]} />
          <meshStandardMaterial color="#b9f6eb" emissive="#80dacd" emissiveIntensity={0.6} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.92, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.23, 0.23, 0.16, 32]} />
              <meshStandardMaterial color={graphite} metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh position={[0, side * 0.09, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.07, 32]} />
              <meshStandardMaterial color={enamel} metalness={0.25} roughness={0.32} />
            </mesh>
          </group>
        ))}
        <mesh position={[0.43, 0.71, 0]} rotation={[0, 0, -0.15]} castShadow>
          <cylinderGeometry args={[0.035, 0.045, 0.34, 16]} />
          <meshStandardMaterial color={graphite} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.455, 0.88, 0]} castShadow>
          <sphereGeometry args={[0.09, 24, 16]} />
          <meshStandardMaterial color={brass} metalness={0.35} roughness={0.25} />
        </mesh>
      </group>

      <Joint position={[0, 0.38, 0]} radius={0.23} />
      <Panel
        size={[1.15, 1.04, 0.8]}
        position={[0, -0.08, 0]}
        radius={0.22}
        color={enamel}
        metalness={0.12}
      />
      <Panel size={[0.82, 0.71, 0.25]} position={[0, -0.055, 0.34]} radius={0.12} />
      <Panel size={[0.52, 0.24, 0.08]} position={[0, 0.1, 0.48]} radius={0.035} color={graphite} />
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[-0.15 + index * 0.15, 0.1, 0.525]}>
          <sphereGeometry args={[0.035, 16, 12]} />
          <meshStandardMaterial
            color={index === 0 ? "#b9f6eb" : "#718c93"}
            emissive={index === 0 ? "#80dacd" : "#000000"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {[-0.09, 0, 0.09].map((y) => (
        <Panel
          key={y}
          size={[0.3, 0.025, 0.025]}
          position={[0, y - 0.2, 0.47]}
          radius={0.01}
          color={graphite}
        />
      ))}
      <Panel size={[0.7, 0.24, 0.56]} position={[0, -0.68, 0]} radius={0.08} color={graphite} />

      {[-1, 1].map((side) => (
        <group key={side}>
          <group position={[side * 0.73, 0.15, 0]} rotation={[0, 0, side * 0.2]}>
            <Joint position={[0, 0, 0]} radius={0.22} />
            <Panel size={[0.32, 0.48, 0.35]} position={[0, -0.28, 0]} radius={0.1} />
            <Joint position={[0, -0.56, 0]} />
            <group position={[0, -0.56, 0]} rotation={[-0.18, 0, side * 0.16]}>
              <Panel
                size={[0.36, 0.43, 0.39]}
                position={[0, -0.25, 0]}
                color={enamel}
                radius={0.11}
              />
              <Joint position={[0, -0.5, 0]} radius={0.12} />
              <Panel size={[0.32, 0.3, 0.28]} position={[0, -0.67, 0.025]} radius={0.09} />
              <Panel
                size={[0.035, 0.12, 0.035]}
                position={[0, -0.76, 0.16]}
                radius={0.012}
                color={graphite}
              />
            </group>
          </group>
          <Joint position={[side * 0.3, -0.84, 0]} radius={0.19} />
          <Panel size={[0.38, 0.41, 0.42]} position={[side * 0.32, -1.07, 0]} radius={0.1} />
          <Joint position={[side * 0.33, -1.32, 0.015]} radius={0.16} />
          <Panel
            size={[0.4, 0.32, 0.44]}
            position={[side * 0.34, -1.5, 0.015]}
            color={enamel}
            radius={0.1}
          />
          <Panel
            size={[0.53, 0.24, 0.78]}
            position={[side * 0.35, -1.73, 0.15]}
            color={graphite}
            radius={0.1}
          />
          <Panel size={[0.5, 0.12, 0.63]} position={[side * 0.35, -1.65, 0.19]} radius={0.055} />
        </group>
      ))}
      {/* Rear access panel gives the model detail when it is turned around. */}
      <Panel
        size={[0.72, 0.65, 0.15]}
        position={[0, -0.07, -0.42]}
        color={graphite}
        radius={0.065}
      />
      {[-0.18, 0, 0.18].map((y) => (
        <Panel
          key={y}
          size={[0.46, 0.045, 0.035]}
          position={[0, y - 0.07, -0.505]}
          color={enamel}
          radius={0.015}
        />
      ))}
    </group>
  )
}

Panel.displayName = "Panel"
Joint.displayName = "Joint"
RobotModel.displayName = "RobotModel"
