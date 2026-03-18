import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-70 text-white',
        secondary:
          'border-transparent bg-neutral-20 text-neutral-90',
        destructive:
          'border-transparent bg-critical-70 text-white',
        outline: 'text-foreground',
        info: 'border-transparent bg-info-10 text-info-90',
        success: 'border-transparent bg-success-10 text-success-90',
        warning: 'border-transparent bg-warning-20 text-warning-90',
        caution: 'border-transparent bg-caution-10 text-caution-90',
        critical: 'border-transparent bg-critical-20 text-critical-90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
