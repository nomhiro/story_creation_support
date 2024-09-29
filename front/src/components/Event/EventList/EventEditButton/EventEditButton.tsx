import Link from 'next/link'
import React from 'react'
import { FaPen } from 'react-icons/fa'

interface EventEditButtonProps { 
  id: string
  worldLineId: string
}

const EventEditButton: React.FC<EventEditButtonProps> = ({ id, worldLineId}) => {
  return (
    <Link href={`events/${worldLineId}/${id}`}>
      <FaPen className='size-5 text-lg hover:text-gray-700 cursor-pointer' />
    </Link>
  )
}

export default EventEditButton