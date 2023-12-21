import React from 'react'

import type { Page} from '../../../payload-types'

import { CMSLink } from '../../_components/CMSLink'
import { Gutter } from 'payload/components/elements'
import RichText from '../../_components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { columns } = props

  return (
    <Gutter className="content">
      <div className="grid grid-cols-12 gap-x-8 gap-y-4 md:grid-cols-6 md:gap-4">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            const columnSizeMap = {
              oneThird: 'col-span-4',
              half: 'col-span-6',
              twoThirds: 'col-span-8',
              full: 'col-span-12',
            }
            console.log(col, index)
            return (
              <div className={`column ${columnSizeMap[size]} md:col-span-6 sm:col-span-6`} key={index}>
                <RichText content={richText} />
                {enableLink && <div className='mt-4'><CMSLink variant={link.appearance} size={link.size} {...link} /> </div>}
              </div>
            )
          })}
      </div>
    </Gutter>
  )

}
