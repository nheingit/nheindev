import type { ArrayField } from 'payload/dist/fields/config/types'
import type { Field } from 'payload/types'

import type { LinkAppearances, LinkSize } from './link'

import deepMerge from '../utilities/deepMerge'
import link from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  size?: LinkSize[] | false
  overrides?: Partial<ArrayField>
}) => Field

const linkGroup: LinkGroupType = ({ appearances, size, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    fields: [
      link({
        appearances,
        size
      }),
    ],
    type: 'array',
  }

  return deepMerge(generatedLinkGroup, overrides)
}

export default linkGroup