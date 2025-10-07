import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Separator({ className, ...props }: SeparatorProps): React.ReactElement<HTMLDivElement> {
  return <div className={cn('h-px w-full bg-slate-200 dark:bg-slate-700', className)} {...props} />
}

