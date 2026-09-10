import { useMemo } from "react"
import { useLoader } from "@react-three/fiber"
import { Center, useTexture } from "@react-three/drei"
import { Box3, Mesh, MeshPhongMaterial, SRGBColorSpace, Vector3 } from "three"
import { TDSLoader } from "three/addons/loaders/TDSLoader.js"

interface PortalGunModelProps {
  rotation: number
}

export function PortalGunModel({ rotation }: PortalGunModelProps) {
  const source = useLoader(TDSLoader, "/models/portalgun/portalgun.3ds", (loader) => {
    loader.setResourcePath("/models/portalgun/textures/")
  })
  const [color, normal] = useTexture([
    "/models/portalgun/textures/color.jpg",
    "/models/portalgun/textures/normal.jpg",
  ])
  const { model, scale } = useMemo(() => {
    const model = source.clone(true)
    color.colorSpace = SRGBColorSpace
    model.traverse((child) => {
      if (!(child instanceof Mesh)) return
      const prepareMaterial = (material: MeshPhongMaterial) => {
        const prepared = material.clone()
        prepared.map = color
        prepared.normalMap = normal
        prepared.specular.setScalar(0.1)
        return prepared
      }
      child.material = Array.isArray(child.material)
        ? child.material.map(prepareMaterial)
        : prepareMaterial(child.material)
    })
    const size = new Box3().setFromObject(model).getSize(new Vector3())
    return { model, scale: 3.8 / Math.max(size.x, size.y, size.z) }
  }, [source, color, normal])

  return (
    <group rotation={[0, rotation, 0]}>
      <Center>
        <primitive object={model} scale={scale} dispose={null} />
      </Center>
    </group>
  )
}

PortalGunModel.displayName = "PortalGunModel"
