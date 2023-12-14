import type { Config } from 'tailwindcss'
import { shadcnPreset } from '@repo/plugin'

const config = {
  presets: [shadcnPreset],
  content: ['./src/app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
} satisfies Config

export default config
