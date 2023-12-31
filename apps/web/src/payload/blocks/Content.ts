import type { Block, Field } from 'payload/types'

import link from '../fields/link'
import richText from '../fields/richText'

const columnFields: Field[] = [
  {
    name: 'size',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
    type: 'select',
  },
  richText(),
  {
    name: 'codeblock',
    type: 'code',
    required: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  fields: [
    {
      name: 'columns',
      fields: columnFields,
      type: 'array',
    },
  ],
  slug: 'content',
}