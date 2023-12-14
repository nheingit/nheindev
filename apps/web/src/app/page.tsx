import React, { Fragment } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Code, Button, CardContent, Card, Input, SearchBar } from '@repo/ui'
import { NavigationMenuDemo } from './_components/Navbar'

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
    <div className="bg-white text-black p-8 flex flex-col min-h-screen">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Noah's Digital Garden</h1>
        <NavigationMenuDemo />
        <SearchBar />
      </header>
      <main className="mb-auto">
        <section>
          <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
          <div className="grid grid-cols-3 gap-6">
            <Card className="w-full">
              <CardContent>
                <img
                  alt="Vector Search App With Ruby On Rails"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '300/200',
                    objectFit: 'cover',
                  }}
                  width="300"
                />
                <h4 className="text-lg font-semibold mt-4">Vector Search App With Ruby On Rails</h4>
                <p className="text-sm text-red-500">Aug 5, 2023</p>
                <p className="mt-2">How to add Vector Search To A Ruby On Rails Application</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <img
                  alt="Daily Writing"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '300/200',
                    objectFit: 'cover',
                  }}
                  width="300"
                />
                <h4 className="text-lg font-semibold mt-4">Daily Writing</h4>
                <p className="text-sm text-red-500">Jan 24, 2023</p>
                <p className="mt-2">
                  In this post I talk about what daily writing has done for me, and how others can
                  start
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <img
                  alt="Account Data Matching exploit"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '300/200',
                    objectFit: 'cover',
                  }}
                  width="300"
                />
                <h4 className="text-lg font-semibold mt-4">Account Data Matching exploit</h4>
                <p className="text-sm text-red-500">Sep 6, 2022</p>
                <p className="mt-2">Anchor - Account Data Matching exploit</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Interested in consulting?</h3>
          <p className="mb-4">
            I provide personalized consulting services for technical content development. Feel free
            to book a session with me.
          </p>
          <Link
            className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            href="#"
          >
            Book a Consultation
          </Link>
        </section>
      </main>
      <footer className="mt-8 text-center py-4 border-t border-gray-200">
        <p className="mb-2">© 2023 Noah's Digital Garden</p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link className="text-black hover:text-red-500" href="#">
                Garden
              </Link>
            </li>
            <li>
              <Link className="text-black hover:text-red-500" href="#">
                GitHub
              </Link>
            </li>
            <li>
              <Link className="text-black hover:text-red-500" href="#">
                Twitter
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}
