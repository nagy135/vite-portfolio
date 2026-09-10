import { ThemeProvider } from "@/components/theme-provider"
import { Portfolio } from "@/components/portfolio/Portfolio"
import "@/App.css"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Portfolio />
    </ThemeProvider>
  )
}

App.displayName = "App"

export default App
