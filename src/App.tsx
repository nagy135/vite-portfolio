import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Character } from './Character'
import { Model } from './Model'
import { Suspense } from 'react'

function App() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Portfolio Title */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 lg:p-16">
        <div className="text-center lg:text-left">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 drop-shadow-2xl">
            Portfolio
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-purple-200/80 max-w-xl">
            Welcome to my creative space
          </p>
        </div>
      </div>

      {/* Right Side - 3D Robot */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 lg:p-16">
        <div className="w-full h-full min-h-[500px] lg:min-h-0 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
          <Canvas camera={{ position: [2.5, 2, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, 3, -5]} intensity={0.4} />
            <Suspense fallback={<Character />}>
              <Model />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default App
