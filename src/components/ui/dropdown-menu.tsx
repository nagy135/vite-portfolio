import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        {React.Children.map(props.children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { isOpen, setIsOpen } as any)
          }
          return child
        })}
      </div>
    )
  }
)
DropdownMenu.displayName = 'DropdownMenu'

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { isOpen, setIsOpen, ...restProps } = props as any

    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        // @ts-ignore
        onClick: () => setIsOpen(!isOpen),
        ref
      })
    }

    return (
      <button
        className={cn('', className)}
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        {...restProps}
      />
    )
  }
)
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = 'center', ...props }, ref) => {
    const { isOpen, ...restProps } = props as any

    if (!isOpen) return null

    return (
      <div
        className={cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          {
            'right-0': align === 'end',
            'left-0': align === 'start',
            'left-1/2 -translate-x-1/2': align === 'center',
          },
          className
        )}
        ref={ref}
        {...restProps}
      />
    )
  }
)
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, ...props }, ref) => {
    const { setIsOpen, ...restProps } = props as any

    return (
      <button
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left',
          className
        )}
        ref={ref}
        onClick={() => setIsOpen(false)}
        {...restProps}
      />
    )
  }
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
