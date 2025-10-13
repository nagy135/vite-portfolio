import { SimpleChat } from './SimpleChat'
import { ThreeDemo } from './ThreeDemo'

export function Demos() {
  return (
    <div className="space-y-8">
      {/* Demo 1: Socket Chat */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Socket Chat</h3>
        <p className="text-sm text-muted-foreground">
          Real-time chat application built with WebSockets and Socket.io. Messages are instantly broadcasted to all connected users, demonstrating live bidirectional communication between client and server. It doesnt store anything, just user name in browser (to keep it simple). Server is self hosted nestjs in docker runtime.
        </p>
        <div className="border rounded-lg p-4 bg-card">
          <SimpleChat />
        </div>
      </div>

      {/* Demo 2: Three.js Nike Shoe */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Three.js</h3>
        <p className="text-sm text-muted-foreground">
          Interactive 3D visualization using Three.js and React Three Fiber. Features orbit controls for rotation and zoom, demonstrates some basic three.js concepts. Actually uses react-three-fiber for the Three.js integration, shows simple nike shoe model.
        </p>
        <div className="border rounded-lg p-4 bg-card">
          <ThreeDemo />
        </div>
      </div>

    </div>
  )
}

