import type { Ref } from 'react'

import React, { forwardRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  left?: boolean
  ref?: Ref<HTMLDivElement>
  right?: boolean
}

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, left = true, right = true } = props

  return (
    <div
      className={[
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
    >
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'