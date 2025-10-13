import { useRef } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { TechBox } from './TechBox'
import VimIcon from '@/assets/icons/vim.svg'
import NixIcon from '@/assets/icons/nix.svg'

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

      {/* Tech boxes in robot's hands */}
      <TechBox
        position={[-0.9, -1.3, 0.7]}
        scale={2.0}
        icon={VimIcon}
      />
      <TechBox
        position={[0.8, -1.3, 0.7]}
        scale={2.0}
        icon={NixIcon}
      />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
