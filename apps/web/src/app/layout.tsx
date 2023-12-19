import React, { useEffect } from 'react'
import { ThemeProvider } from './_components/theme-provider'
import { ModeToggle } from './_components/theme-toggle'
import { NavigationMenu } from './_components/Navbar'
import { AspectRatio, SearchBar } from '@repo/ui'
import { BannerImage } from './_components/bannerImage'
import { BannerCorrectedImage } from './_components/banner-image-corrected'

import './globals.css'

export const metadata = {
  title: 'NheinDev',
  description: "Noah Hein's Digital Garden",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-12">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-3xl font-bold text-primary">Noah's Digital Garden</h1>
              <div className="flex justify-between items-center space-x-4">
                <NavigationMenu />
                <ModeToggle />
                <SearchBar />
              </div>
            </div>
            <AspectRatio ratio={3 / 1}>
              <BannerCorrectedImage />
            </AspectRatio>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
