import Link from 'next/link'
import React from 'react'
import { FaPen } from 'react-icons/fa'

interface CharacterEditButtonProps { 
  id: string
  worldLineId: string
}

const CharacterEditButton: React.FC<CharacterEditButtonProps> = ({ id, worldLineId}) => {
  return (
    <Link href={`characters/${worldLineId}/${id}`}>
      <FaPen className='size-5 text-lg hover:text-gray-700 cursor-pointer' />
    </Link>
  )
}

export default CharacterEditButton