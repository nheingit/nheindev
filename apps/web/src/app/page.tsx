import React, { Fragment } from 'react'
import { notFound } from 'next/navigation'
import { Code, Button } from '@repo/ui'

import { getPayloadClient } from '../getPayload'
import { Page } from './../payload-types'

export default async function Home() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const home = docs?.[0] as Page

  if (!home) {
    return notFound()
  }

  return (
    <Fragment>
      <h1 className="uppercase">hello big h1</h1>
      <Button variant="secondary" className="animate-in zoom-in duration-500">
        Secondary
      </Button>
      <Button variant="ghost">Ghost</Button>
    </Fragment>
  )
}
