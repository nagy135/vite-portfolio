import { Component, lazy, Suspense, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Layers, Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import PortalLogo from "@/assets/icons/portal-ring.svg"

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
  const { resolvedTheme } = useTheme()
  const [scan, setScan] = useState(0.62)
  const [rotation, setRotation] = useState(0)
  const [model, setModel] = useState<"logo" | "slices" | "portalgun">("logo")
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [visible, setVisible] = useState(true)
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== "hidden")
  const stageRef = useRef<HTMLDivElement>(null)
  const modelName = model === "portalgun" ? "portal gun" : "logo"

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

  function switchModel(next: "logo" | "slices" | "portalgun") {
    setModel(next)
    setRotation(0)
  }

  return (
    <div ref={stageRef} className="robot-stage">
      <div className="model-switches">
        <Button
          variant="outline"
          size="sm"
          className="model-switch"
          aria-label={model === "portalgun" ? "Show logo" : "Show portal gun"}
          title={model === "portalgun" ? "Show logo" : "Show portal gun"}
          onClick={() => switchModel(model === "portalgun" ? "logo" : "portalgun")}
        >
          {model === "portalgun" ? "Show logo" : <img src={PortalLogo} alt="" width={24} height={24} className="portal-switch-logo" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="model-switch"
          aria-label={model === "slices" ? "Show solid logo" : "Show slices"}
          aria-pressed={model === "slices"}
          onClick={() => switchModel(model === "slices" ? "logo" : "slices")}
        >
          <Layers size={16} />
          {model === "slices" ? "Solid logo" : "Slice view"}
        </Button>
      </div>
      <div
        className={`robot-canvas${model === "slices" ? " logo-scan-canvas" : ""}`}
      >
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
              scan={scan}
              dark={resolvedTheme === "dark"}
            />
          </Suspense>
        </RobotBoundary>
      </div>
      {model === "slices" ? (
        <div className="robot-controls logo-scan-controls">
          <label htmlFor="logo-scan">Slide to scan</label>
          <input
            id="logo-scan"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(scan * 100)}
            aria-label="Logo slice depth"
            aria-valuetext={`${Math.round(scan * 100)} percent through the logo`}
            onChange={(event) => setScan(Number(event.target.value) / 100)}
          />
          <span aria-hidden="true">{String(Math.round(scan * 100)).padStart(2, "0")}%</span>
        </div>
      ) : (
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
      )}
    </div>
  )
}

RobotStage.displayName = "RobotStage"
