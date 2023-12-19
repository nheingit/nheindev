import React, { Fragment } from 'react'

import type { Page } from '../../payload-types'

import { Gutter } from '../_components/Gutter'
import { CMSLink } from '../_components/CMSLink'
import { Media } from '../_components/Media'
import RichText from '../_components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <Gutter>
      <div>
        <RichText content={richText} />
        {Array.isArray(links) && links.length > 0 && (
          <ul >
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div>
        {typeof media === 'object' && (
          <Fragment>
            <Media priority resource={media} />
            {media?.caption && <RichText content={media.caption} />}
          </Fragment>
        )}
      </div>
    </Gutter>
  )
}