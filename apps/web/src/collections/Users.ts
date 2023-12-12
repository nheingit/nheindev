import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [],
  admin: {
    useAsTitle: 'email',
  },
}

export default Users
