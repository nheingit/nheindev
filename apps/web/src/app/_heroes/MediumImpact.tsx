import React from 'react'

import type { Page } from '../../payload-types'

import { Gutter } from '../_components/Gutter'
import { CMSLink } from '../_components/CMSLink'
import { Media } from '../_components/Media'
import RichText from '../_components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = (props) => {
  const { links, media, richText } = props

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
      <div>
        {typeof media === 'object' && <Media priority resource={media} />}
      </div>
    </Gutter>
  )
}