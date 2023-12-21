import type { Config } from 'tailwindcss'
import { shadcnPreset } from '@repo/plugin'
import typographyPlugin from '@tailwindcss/typography'


const config = {
  presets: [shadcnPreset],
  content: ['./src/app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  plugins: [typographyPlugin]
} satisfies Config

export default config
