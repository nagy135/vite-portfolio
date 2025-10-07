import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps): React.ReactElement<HTMLDivElement> {
  return <div className={cn('rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200', className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement<HTMLDivElement> {
  return <div className={cn('p-4 sm:p-6', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement<HTMLDivElement> {
  return <div className={cn('p-4 sm:p-6 pt-0', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement<HTMLHeadingElement> {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />
}

