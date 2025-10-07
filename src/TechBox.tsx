import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

interface TechBoxProps {
  position?: [number, number, number]
  scale?: number
  icon: string
  color?: string
}

export function TechBox({ position = [0, 0, 0], scale = 1, icon, color }: TechBoxProps) {
  const texture = useLoader(THREE.TextureLoader, icon)
  
  // Configure the texture
  texture.flipY = true
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping

  return (
    <group position={position} scale={scale}>
      {/* Box with icon texture on all faces */}
      <mesh>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          map={texture} 
          color={color}
          transparent={true}
          alphaTest={0.1}
        />
      </mesh>
    </group>
  )
}
