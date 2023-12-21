import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import { variantOptions } from '@repo/ui'

export const appearanceOptions = variantOptions.variant

export type LinkAppearances = keyof typeof variantOptions.variant
export type LinkSize= keyof typeof variantOptions.size


type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  size?: LinkSize[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

const link: LinkType = ({ appearances, size, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        fields: [
          {
            name: 'type',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            type: 'radio',
          },
          {
            name: 'newTab',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
            type: 'checkbox',
          },
        ],
        type: 'row',
      },
    ],
    type: 'group',
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages'],
      required: true,
      type: 'relationship',
    },
    {
      name: 'url',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
      type: 'text',
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      fields: [
        ...linkTypes,
        {
          name: 'label',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
          type: 'text',
        },
      ],
      type: 'row',
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = Object.keys(appearanceOptions).map((appearance) => ({
      label: appearance.charAt(0).toUpperCase() + appearance.slice(1), // capitalizes first letter
      value: appearance,
    }))

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => ({
        label: appearance.charAt(0).toUpperCase() + appearance.slice(1), // capitalizes first letter
        value: appearance,
      }))
    }

    linkResult.fields.push({
      name: 'appearance',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      type: 'select',
    })
  }

  if (size !== false) {
    let sizeOptionsToUse = Object.keys(variantOptions.size).map((size) => ({
      label: size.charAt(0).toUpperCase() + size.slice(1), // capitalizes first letter
      value: size,
    }))

    if (size) {
      sizeOptionsToUse = size.map((size) => ({
        label: size.charAt(0).toUpperCase() + size.slice(1), // capitalizes first letter
        value: size,
      }))
    }

    linkResult.fields.push({
      name: 'size',
      admin: {
        description: 'Choose the size of the link.',
      },
      defaultValue: 'default',
      options: sizeOptionsToUse,
      type: 'select',
    })
  }

  return deepMerge(linkResult, overrides)
}

export default link