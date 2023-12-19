import Link from 'next/link'
import React from 'react'

import type { Page } from '../../payload-types'

type CMSLinkType = {
  children?: React.ReactNode
  className?: string
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

    if (href || url) {
      return (
        <Link {...newTabProps} href={href || url}>
          {label && label}
          {children && children}
        </Link>
      )
    }
  }

  