import { lazy, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Html, OrbitControls } from "@react-three/drei"
import { LogoModel } from "@/components/portfolio/LogoModel"

const PortalGunModel = lazy(() =>
  import("@/components/portfolio/PortalGunModel").then((module) => ({
    default: module.PortalGunModel,
  })),
)

interface ModelSceneProps {
  rotation: number
  model: "logo" | "portalgun"
  autoRotate: boolean
  reducedMotion: boolean
  scan: number
  dark: boolean
}

export default function ModelScene({
  rotation,
  model,
  autoRotate,
  reducedMotion,
  scan,
  dark,
}: ModelSceneProps) {
  const modelName = model === "logo" ? "logo" : "portal gun"
  return (
    <Canvas
      key={model}
      camera={{ position: [0, 0, 8.5], fov: 34 }}
      dpr={[1, 1.5]}
      frameloop={model === "portalgun" && autoRotate ? "always" : "demand"}
      fallback={<p className="robot-fallback">This browser cannot display the 3D model.</p>}
      aria-label={
        model === "logo"
          ? "Drag to rotate the solid logo through a fixed scan direction, 45 degrees horizontally and 20 degrees vertically. Use the slider to move the scan plane."
          : "An interactive 3D portal gun. Drag to explore, or use the rotation buttons."
      }
    >
      <ambientLight intensity={2} />
      <directionalLight position={[0, 2, 5]} intensity={2.5} color="#fff5e8" />
      <directionalLight position={[-4, 1, -3]} intensity={1.2} color="#dce8ff" />
      <Suspense
        fallback={
          <Html center>
            <span className="text-sm whitespace-nowrap">Loading {modelName}…</span>
          </Html>
        }
      >
        {model === "logo" ? (
          <LogoModel scan={scan} dark={dark} />
        ) : (
          <PortalGunModel rotation={rotation} />
        )}
      </Suspense>
      {model === "portalgun" && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping={!reducedMotion}
          dampingFactor={0.045}
          rotateSpeed={0.65}
          autoRotate={autoRotate}
          autoRotateSpeed={0.4}
        />
      )}
    </Canvas>
  )
}

ModelScene.displayName = "ModelScene"
