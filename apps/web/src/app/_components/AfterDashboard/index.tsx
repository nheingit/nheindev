'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { ModeToggle } from '../theme-toggle'

const AfterDashboard: React.FC = () => {
  const { setTheme } = useTheme()
  return (
    <div>
      <ModeToggle />
      <h4>Test Config</h4>
      <p>
        From the AfterDashboard.tsx The /test directory is used for create custom configurations and
        data seeding for developing features, writing e2e and integration testing.
      </p>
    </div>
  )
}

export default AfterDashboard
