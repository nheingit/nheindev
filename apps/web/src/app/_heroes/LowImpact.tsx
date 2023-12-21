import React from 'react'

import type { Page } from '../../payload-types'

import { Gutter } from '../_components/Gutter'
import { CMSLink } from '../_components/CMSLink'
import RichText from '../_components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText, links }) => {
  return (
    <Gutter>
      <div>
          <RichText content={richText} />
          {Array.isArray(links) && (
          <ul>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink variant={link.appearance} size={link.size} {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Gutter>
  )
}