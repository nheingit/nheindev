import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import CustomDefaultView from './app/_components/CustomDefaultView'
import AfterDashboard from './app/_components/AfterDashboard'
import Dashboard from './app/_components/CustomDashboard'
import { NavigationMenu } from './app/_components/Navbar'
import { ThemeProvider } from './app/_components/theme-provider'
import { Logo } from './app/_components/logo'
import  { Users }  from './payload/collections/Users'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Users, Pages, Media],
  admin: {
    components: {
      graphics: {
        Icon: Logo,
        Logo,
      },
      providers: [ThemeProvider],
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
