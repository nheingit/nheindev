import React from 'react'

import { serializeLexical } from './serialize'

const RichText: React.FC<{ className?: string; content: any }> = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText