import React from 'react'
import {Loader2Icon } from 'lucide-react'
const Loading = () => {
  return (
    <div className='flex-center min-h-96 h-full w-full'> 
      <Loader2Icon className="animate-spin" />
    </div>
  )
}

export default Loading
