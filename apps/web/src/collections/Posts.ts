import {
  CallToAction,
  Archive,
  Content,
  ContentMedia,
  MediaBlock,
  hero,
  slugField,
} from '@repo/payload'

import type { Page } from '../payload-types'
import type { CollectionConfig } from 'payload/types'
import type { BeforeChangeHook, AfterReadHook } from 'payload/dist/collections/config/types'
import type { Payload } from 'payload'

export const populatePublishedDate: BeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.body && !req.body.publishedDate) {
      const now = new Date()
      return {
        ...data,
        publishedDate: now,
      }
    }
  }

  return data
}

export const revalidate = async (args: {
  collection: string
  payload: Payload
  slug: string
}): Promise<void> => {
  const { collection, payload, slug } = args

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`,
    )

    if (res.ok) {
      payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`)
    } else {
      payload.logger.error(
        { res },
        `Error revalidating page '${slug}' in collection '${collection}'`,
      )
    }
  } catch (err: unknown) {
    payload.logger.error(
      { err },
      `Error hitting revalidate route for page '${slug}' in collection '${collection}'`,
    )
  }
}

export const revalidatePost: AfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') {
    void revalidate({ collection: 'posts', payload, slug: doc.slug })
  }

  return doc
}

export const populateArchiveBlock: AfterReadHook = async ({ doc, req: { payload } }) => {
  // pre-populate the archive block if `populateBy` is `collection`
  // then hydrate it on your front-end

  const layoutWithArchive = await Promise.all(
    doc.layout.map(async block => {
      if (block.blockType === 'archive') {
        const archiveBlock = block as Extract<Page['layout'][0], { blockType: 'archive' }> & {
          populatedDocs: Array<{
            relationTo: 'pages' | 'posts'
            value: string
          }>
        }

        if (archiveBlock.populateBy === 'collection') {
          const res = await payload.find({
            collection: archiveBlock.relationTo,
            limit: archiveBlock.limit || 10,
            sort: '-publishedDate',
            where: {
              ...(archiveBlock?.categories?.length > 0
                ? {
                    categories: {
                      in: archiveBlock.categories
                        .map(cat => {
                          if (typeof cat === 'string') return cat
                          return cat.id
                        })
                        .join(','),
                    },
                  }
                : {}),
            },
          })

          return {
            ...block,
            populatedDocs: res.docs.map((thisDoc: Post) => ({
              relationTo: archiveBlock.relationTo,
              value: thisDoc.id,
            })),
            populatedDocsTotal: res.totalDocs,
          }
        }
      }

      return block
    }),
  )

  return {
    ...doc,
    layout: layoutWithArchive,
  }
}

export const Posts: CollectionConfig = {
  access: {
    delete: () => false,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    // livePreview: {
    //   url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/posts/${data?.slug}`,
    // },
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/posts/${doc?.slug as string}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      name: 'publishedOn',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
      type: 'date',
    },
    {
      name: 'authors',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
      type: 'array',
    },
    {
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              blocks: [CallToAction, Content, ContentMedia, MediaBlock, Archive],
              required: true,
              type: 'blocks',
            },
            {
              name: 'enablePremiumContent',
              label: 'Enable Premium Content',
              type: 'checkbox',
            },
            {
              name: 'premiumContent',
              access: {
                read: ({ req }) => req.user,
              },
              blocks: [CallToAction, Content, MediaBlock, Archive],
              type: 'blocks',
            },
          ],
          label: 'Content',
        },
      ],
      type: 'tabs',
    },
    {
      name: 'relatedPosts',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'posts',
      type: 'relationship',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateArchiveBlock],
    beforeChange: [populatePublishedDate],
  },
  slug: 'posts',
  versions: {
    drafts: true,
  },
}
