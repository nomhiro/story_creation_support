import Link from 'next/link'
import React from 'react'
import { FaPen } from 'react-icons/fa'

interface WoldLineEditButtonProps { 
  id: string
}

const WoldLineEditButton: React.FC<WoldLineEditButtonProps> = ({id}) => {
  return (
    <Link href={`world_line/edit/${id}`}>
      <FaPen className='size-5 text-lg hover:text-gray-700 cursor-pointer' />
    </Link>
  )
}

export default WoldLineEditButton