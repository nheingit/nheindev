import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import './app/globals.css'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import Categories from './collections/Categories'
import CustomDefaultView from './app/_components/CustomDefaultView'
import AfterDashboard from './app/_components/AfterDashboard'
import Dashboard from './app/_components/CustomDashboard'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Pages, Users, Posts, Categories],
  admin: {
    components: {
      afterDashboard: [AfterDashboard],
      views: {
        Dashboard,
        customDefaultView: {
          path: '/custom-default-view',
          Component: CustomDefaultView,
          },
      }
    },
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
