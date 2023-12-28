import { Block } from 'payload/types';

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  graphQL: {
    singularName: 'FormBlock',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    }
  ],
};