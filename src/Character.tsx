import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

export function Character(props: ThreeElements['group']) {
  const group = useRef<THREE.Group | null>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.6
    }
  })

  return (
    <group ref={group} {...props} position={[0, -0.5, 0]}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.5, 1.2, 24]} />
        <meshStandardMaterial color="#6ab0ff" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.9, 0.7, 0.7]} />
        <meshStandardMaterial color="#f0f3f8" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.25, 1.65, 0.36]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#2222ff" color="#111122" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.25, 1.65, 0.36]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#2222ff" color="#111122" emissiveIntensity={1.8} />
      </mesh>

      {/* Arms */}
      <mesh position={[0.75, 0.9, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
        <meshStandardMaterial color="#b8d2ff" roughness={0.6} />
      </mesh>
      <mesh position={[-0.75, 0.9, 0]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
        <meshStandardMaterial color="#b8d2ff" roughness={0.6} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.25, 0.0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 16]} />
        <meshStandardMaterial color="#9bbcff" roughness={0.6} />
      </mesh>
      <mesh position={[-0.25, 0.0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 16]} />
        <meshStandardMaterial color="#9bbcff" roughness={0.6} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
        <circleGeometry args={[3, 64]} />
        <meshStandardMaterial color="#e9eef7" />
      </mesh>
    </group>
  )
}
