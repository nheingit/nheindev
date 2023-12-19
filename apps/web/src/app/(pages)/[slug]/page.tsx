import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Page } from '../../../payload-types'

import { staticHome } from '../../../seed/home-static'
import { PageClient } from './page.client'
import { getPayloadClient } from '../../../getPayload'


export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()
  const payload = await getPayloadClient()
  let page: Page | null = null

  try {
    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug
            }
        }
    })
    page = docs?.[0]
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    console.error('function Page tried: fetchDoc<Page> failed, error:', error)
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = staticHome
  }

  if (!page) {
    return notFound()
  }

  return <PageClient page={page} />
}