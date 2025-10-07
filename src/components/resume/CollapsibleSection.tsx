import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-200 shadow-md hover:shadow-lg bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg cursor-pointer"
        aria-expanded={isOpen}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="transition-transform duration-300">
          {isOpen ? (
            <ChevronDown className="h-5 w-5 transition-transform" />
          ) : (
            <ChevronRight className="h-5 w-5 transition-transform" />
          )}
        </div>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-[5000px] opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pb-4 pt-2">
          {children}
        </div>
      </div>
    </div>
  )
}
