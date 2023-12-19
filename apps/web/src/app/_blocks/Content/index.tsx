import React from 'react'

import type { Page} from '../../../payload-types'

import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/CMSLink'
import RichText from '../../_components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { columns } = props

  return (
    <Gutter>
      <div >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div key={index}>
                <RichText content={richText} />
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </Gutter>
  )
}

