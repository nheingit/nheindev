import React from 'react'
import Link from 'next/link'

import './globals.css'

export const metadata = {
  title: 'NheinDev',
  description: "Noah Hein's Digital Garden",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
