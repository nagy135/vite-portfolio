import * as React from "react"

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap z-50 animate-in fade-in-0 zoom-in-95 dark:bg-gray-700">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </div>
      )}
    </div>
  )
}
