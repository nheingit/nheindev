import { Button } from '@repo/ui'
import Link from 'next/link'
import React from 'react'

import type { Page } from '../../payload-types'
import type { ButtonProps } from '@repo/ui'

type CMSLinkType = {
  children?: React.ReactNode
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  label?: string
  newTab?: boolean
  reference?: {
    relationTo: 'pages'
    value: Page | string
  }
  type?: 'custom' | 'reference'
  url?: string
}

export const CMSLink: React.FC<CMSLinkType> = ({
  children,
  variant,
  size,
  label,
  newTab,
  reference,
  type,
  url,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `/${reference.value.slug}`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}


  return (
    //@ts-expect-error
    <Button variant={variant} size={size}  asChild>
      <Link {...newTabProps} href={href || url}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
