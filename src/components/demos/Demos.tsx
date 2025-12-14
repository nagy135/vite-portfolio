import { SimpleChat } from './SimpleChat'
import { ThreeDemo } from './ThreeDemo'
import LogoDemo from './LogoDemo'
import { CanvasAnimation } from './CanvasAnimation'

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

       {/* Demo 3: Interactive Logo */}
       <div className="space-y-2">
         <h3 className="text-lg font-semibold">Interactive Logo</h3>
         <p className="text-sm text-muted-foreground">
           Physics-based SVG animation that responds to mouse movements. I m sharing it to demonstrate what kind of person i am, i saw cool animation and i had to understand how to do it :D It is inspired by <a href="https://elm-lang.org/" target="_blank" className="underline">this</a> but with my own svg with my name's first letter and much more sensitive to show more how it works. Did many more animations like this in past few years and most are on my github but this one i really like (its simplicity and fun) and consider my LOGO so its here :)
         </p>
         <div className="border rounded-lg p-4 bg-card flex justify-center">
           <LogoDemo />
         </div>
       </div>

       {/* Demo 4: Canvas Animation */}
       <div className="space-y-2">
         <h3 className="text-lg font-semibold">Canvas Animation</h3>
         <p className="text-sm text-muted-foreground">
           Interactive canvas animation with physics simulation. Three SVG icons follow your mouse movement with momentum and gradually return to their original positions. The animation uses velocity damping and attraction forces to create a smooth, natural motion effect.
         </p>
         <div className="border rounded-lg p-4 bg-card">
           <CanvasAnimation />
         </div>
       </div>

     </div>
   )
}

