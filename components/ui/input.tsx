import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border-0 ring-1 ring-inset ring-neutral-50 bg-white px-3 py-2 text-base placeholder:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-90 hover:ring-neutral-70 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-5 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
