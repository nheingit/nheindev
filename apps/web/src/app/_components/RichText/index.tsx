import React from 'react'

import { serializeLexical } from './serialize'

const RichText: React.FC<{ className?: string; content: any }> = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className='prose prose-zinc dark:prose-invert lg:prose-lg xl:prose-xl sm:prose-sm'>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText