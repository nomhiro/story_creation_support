import Link from 'next/link'
import React from 'react'
import { FaPen } from 'react-icons/fa'

interface StoryEditButtonProps { 
  id: string
  worldLineId: string
}

const StoryEditButton: React.FC<StoryEditButtonProps> = ({ id, worldLineId}) => {
  return (
    <Link href={`storys/${worldLineId}/${id}`}>
      <FaPen className='size-5 text-lg hover:text-gray-700 cursor-pointer' />
    </Link>
  )
}

export default StoryEditButton