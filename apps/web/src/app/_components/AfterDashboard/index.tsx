"use client"

import React from 'react'
import { useTheme } from "next-themes"

import './index.scss'

const baseClass = 'after-dashboard'

const AfterDashboard: React.FC = () => {
  const { setTheme } = useTheme()
  return (
    <div className={baseClass}>
      <button onClick={() => setTheme('light')}>
        Toggle themes light
      </button>
      <button onClick={() => setTheme('dark')}>
        Toggle themes dark
      </button>
      <button onClick={() => setTheme('system')}>
        Toggle themes system
      </button>
      <h4>Test Config</h4>
      <p>
        From the AfterDashboard.tsx
        The /test directory is used for create custom configurations and data seeding for developing
        features, writing e2e and integration testing.
      </p>
    </div>
  )
}

export default AfterDashboard