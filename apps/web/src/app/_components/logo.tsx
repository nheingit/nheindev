import * as React from 'react'
import Image from 'next/image'
export const Logo: React.FC = () => (
  <img
    className="mt-8 rounded-full h-48 w-48 after:none"
    src="/images/monkey-coffee.jpg"
    alt="monkey holding a coffee"
  />
)
