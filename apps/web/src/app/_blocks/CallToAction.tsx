import React from 'react'

import type { Page } from '../../payload-types'

//import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../_components/CMSLink'
import RichText from '../_components/RichText'
//import { VerticalPadding } from '../../_components/VerticalPadding'
//import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText }) => {
  return (
   <>
          <div>
            <RichText content={richText} />
          </div>
          <div>
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} {...link}  />
            })}
          </div>
    </>

  )
}