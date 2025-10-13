import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

// Nike Air Zoom Pegasus 36 model
const NIKE_SHOE_URL = '/nikeshoe.glb'

function NikeShoe() {
  const gltf = useGLTF(NIKE_SHOE_URL)

  return (
    <Center>
      <primitive object={gltf.scene} scale={10} />
    </Center>
  )
}

function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export function ThreeDemo() {
  return (
    <div className="w-full h-[400px] rounded-lg shadow-xl bg-gradient-to-br from-background to-muted/10 overflow-hidden">
      <Canvas camera={{ position: [20, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <Suspense fallback={<FallbackBox />}>
          <NikeShoe />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}

