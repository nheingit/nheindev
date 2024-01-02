import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import FormBuilder from '@payloadcms/plugin-form-builder';
import dotenv from 'dotenv'
import path from 'path'


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
import link, {LinkAppearances, LinkSize} from './payload/fields/link';
import { Field } from 'payload/types';
import { CodeBlockFeature } from './payload/plugin/CodeBlock';


dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  size?: LinkSize[] | false
}) => Field

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [Users, Pages, Media],
  email: {
    fromName: 'Admin',
    fromAddress: 'admin@example.com',
    logMockCredentials: true,
  },
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
  editor: lexicalEditor({
    features: ({defaultFeatures}) => [
      ...defaultFeatures,
      CodeBlockFeature()
    ]
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    FormBuilder({
      fields: {
        payment: false,
      }
    })
  ]
})
