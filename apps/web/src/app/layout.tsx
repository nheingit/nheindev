import React from 'react'
import Link from 'next/link'

import './globals.css'
import './app.scss'
import './i18n'

import classes from './layout.module.scss'

export const metadata = {
  title: 'NheinDev',
  description: "Noah Hein's Digital Garden",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classes.body}>
        <header className={classes.header}>
          <Link href="https://payloadcms.com" target="_blank" rel="noopener noreferrer">
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
              />
              <img
                className={classes.logo}
                alt="Payload Logo"
                src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-dark.svg"
              />
            </picture>
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
