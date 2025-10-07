import { useRef } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Open-source model: RobotExpressive from Three.js examples
// Source: https://github.com/mrdoob/three.js/tree/master/examples/models/gltf/RobotExpressive
const MODEL_URL =
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb'

export function Model(props: ThreeElements['group']) {
  const group = useRef<THREE.Group | null>(null)
  const gltf = useGLTF(MODEL_URL)

  return (
    <group ref={group} {...props} position={[0, 0, 0]}>
      <Center >
        {/* Scale slightly for better presence */}
        <primitive object={gltf.scene} scale={1.0} />
      </Center>
    </group>
  )
}

useGLTF.preload(MODEL_URL)
