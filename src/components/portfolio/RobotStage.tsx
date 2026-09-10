import { Component, lazy, Suspense, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const ModelScene = lazy(() => import("@/components/portfolio/ModelScene"))

interface RobotBoundaryProps {
  children: ReactNode
}

class RobotBoundary extends Component<RobotBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed)
      return (
        <p className="robot-fallback">
          The model couldn’t load. Switch models or refresh to try again.
        </p>
      )
    return this.props.children
  }
}

export function RobotStage() {
  const [rotation, setRotation] = useState(0)
  const [model, setModel] = useState<"logo" | "portalgun">("logo")
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [visible, setVisible] = useState(true)
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== "hidden")
  const stageRef = useRef<HTMLDivElement>(null)
  const modelName = model === "logo" ? "logo" : "portal gun"

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReducedMotion(motion.matches)
    const updateVisibility = () => setTabVisible(document.visibilityState !== "hidden")
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (stageRef.current) observer.observe(stageRef.current)
    motion.addEventListener("change", updateMotion)
    document.addEventListener("visibilitychange", updateVisibility)
    return () => {
      observer.disconnect()
      motion.removeEventListener("change", updateMotion)
      document.removeEventListener("visibilitychange", updateVisibility)
    }
  }, [])

  function switchModel() {
    setModel(model === "logo" ? "portalgun" : "logo")
    setRotation(0)
  }

  return (
    <div ref={stageRef} className="robot-stage">
      <Button variant="outline" size="sm" className="model-switch" onClick={switchModel}>
        {model === "logo" ? "Show portal gun" : "Show logo"}
      </Button>
      <div className="robot-canvas">
        <RobotBoundary key={model}>
          <Suspense
            fallback={
              <p className="robot-fallback" role="status">
                Loading {modelName}…
              </p>
            }
          >
            <ModelScene
              rotation={rotation}
              model={model}
              autoRotate={!paused && !reducedMotion && visible && tabVisible}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </RobotBoundary>
      </div>
      <div className="robot-controls">
        <span>Drag to rotate</span>
        <div className="flex gap-1">
          {!reducedMotion && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={paused ? "Resume model spin" : "Pause model spin"}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={17} /> : <Pause size={17} />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Rotate ${modelName} left`}
            onClick={() => setRotation((value) => value - Math.PI / 4)}
          >
            <RotateCcw size={17} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Rotate ${modelName} right`}
            onClick={() => setRotation((value) => value + Math.PI / 4)}
          >
            <RotateCw size={17} />
          </Button>
        </div>
      </div>
    </div>
  )
}

RobotStage.displayName = "RobotStage"
