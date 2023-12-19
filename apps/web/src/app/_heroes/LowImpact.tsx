import React from 'react'

import type { Page } from '../../payload-types'

import { Gutter } from '../_components/Gutter'
import RichText from '../_components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <Gutter>
      <div>
          <RichText content={richText} />
      </div>
    </Gutter>
  )
}