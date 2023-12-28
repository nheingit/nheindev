import type { Block } from 'payload/types'

import { invertBackground } from '../fields/invertBackground'
import linkGroup from '../fields/linkGroup'
import richText from '../fields/richText'

export const CallToAction: Block = {
  fields: [
    {
      name: 'url',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
      type: 'text',
    },
    invertBackground,
    richText(),
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
  slug: 'cta',
}