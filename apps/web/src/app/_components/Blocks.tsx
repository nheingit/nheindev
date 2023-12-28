import React, { Fragment } from 'react'

import type { Page } from '../../payload-types'
//import type { VerticalPaddingOptions } from '../VerticalPadding'

//import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../_blocks/CallToAction'
//import { CommentsBlock, type CommentsBlockProps } from '../../_blocks/Comments/index'
import { ContentBlock } from '../_blocks/Content'
import { FormBlock } from '../_blocks/Form'
import { toKebabCase } from '../_utilities/toKebabCase'
//import { ContentMedia } from '../../_blocks/ContentMedia'
//import { MediaBlock } from '../../_blocks/MediaBlock'
//import { RelatedPosts, type RelatedPostsProps } from '../../_blocks/RelatedPosts'
//import { toKebabCase } from '../../_utilities/toKebabCase'
//import { BackgroundColor } from '../BackgroundColor'
//import { VerticalPadding } from '../VerticalPadding'

const blockComponents = {
  //archive: ArchiveBlock,
  //comments: CommentsBlock,
  content: ContentBlock,
  //contentMedia: ContentMedia,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  //mediaBlock: MediaBlock,
  //relatedPosts: RelatedPosts,
}

export const Blocks: React.FC<{
  blocks: ( Page['layout'][0] )[]
  disableTopPadding?: boolean
}> = (props) => {
  const { blocks, disableTopPadding } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            // the cta block is containerized, so we don't consider it to be inverted at the block-level

            if (Block) {
              return (
                <div key={index}>
                    {/*@ts-expect-error */}
                    <Block id={toKebabCase(blockName)} {...block} />
                </div>                                   
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

