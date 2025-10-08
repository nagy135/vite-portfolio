import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Character } from './Character'
import { Model } from './Model'
import { Suspense } from 'react'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Resume } from '@/components/resume/Resume'
import { Phone, Mail, Globe } from 'lucide-react'
import GitHubIcon from '@/assets/icons/github.svg'
import LinkedInIcon from '@/assets/icons/linkedin.svg'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {/* Theme Toggle */}
          <div className="absolute top-4 right-4 z-50">
            <ModeToggle />
          </div>

          {/* Hero: Title + Robot side-by-side */}
          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 shadow-sm bg-gradient-to-b from-transparent to-muted/5 cursor-move">
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-5xl font-bold text-left drop-shadow-sm">Portfolio</h1>
                <p className="mt-2 text-xl sm:text-2xl text-left text-muted-foreground">Viktor Nagy</p>
                <p>Just a CV summary with with some project previews and some animations to show some concepts.</p>
              </div>
              <div className="w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-lg shadow-xl bg-gradient-to-br from-background to-muted/10 overflow-hidden">
                <Canvas camera={{ position: [7.5, 2, 4], fov: 50 }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 5, 5]} intensity={1.2} />
                  <directionalLight position={[-5, 3, -5]} intensity={0.4} />
                  <Suspense fallback={<Character />}>
                    <Model />
                  </Suspense>
                  <OrbitControls enablePan={false} enableZoom={true} autoRotate autoRotateSpeed={1.1} />
                </Canvas>
              </div>
            </div>
          </section>

          {/* Social + Contacts (full width centered) */}
          <div className="w-full px-4 sm:px-6 lg:px-8 bg-muted/20">
            <div className="mx-auto w-full max-w-5xl">
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm py-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+421 951 091 019</span>
                </div>
                <Separator className="hidden sm:block w-px h-4" />
                <a href="mailto:viktor.nagy1995@gmail.com" className="underline flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>viktor.nagy1995@gmail.com</span>
                </a>
                <Separator className="hidden sm:block w-px h-4" />
                <a href="https://infiniter.tech" target="_blank" className="underline flex items-center gap-2" rel="noreferrer">
                  <Globe className="h-4 w-4" />
                  <span>infiniter.tech</span>
                </a>
                <Separator className="hidden sm:block w-px h-4" />
                <a href="https://github.com/nagy135" target="_blank" className="underline flex items-center gap-2" rel="noreferrer">
                  <img src={GitHubIcon} alt="GitHub" className="h-4 w-4" />
                  <span>github.com/nagy135</span>
                </a>
                <Separator className="hidden sm:block w-px h-4" />
                <a href="https://www.linkedin.com/in/viktor-nagy-5a3504167" target="_blank" className="underline flex items-center gap-2" rel="noreferrer">
                  <img src={LinkedInIcon} alt="LinkedIn" className="h-4 w-4" />
                  <span>linkedin</span>
                </a>
              </div>
            </div>
          </div>

          {/* Resume Content */}
          <Resume />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
