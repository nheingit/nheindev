import React from 'react'

import type { Page } from '../../payload-types'

import { HighImpactHero } from '../_heroes/HighImpact'
import { MediumImpactHero } from '../_heroes/MediumImpact'
import { LowImpactHero } from '../_heroes/LowImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const Hero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}