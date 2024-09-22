"use client"
import React from 'react'
import { useFormState } from 'react-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { FormState, deleteWorldLine } from '../../../actions/WorldLine'

interface WorldLineDeleteButtonProps { 
  id: string
}

const WorldLineDeleteButton: React.FC<WorldLineDeleteButtonProps> = ({ id }) => {
  const deleteWorldLineWithId = deleteWorldLine.bind(null, id)
  const initialState: FormState = { error: '' };
  const [_, formAction] = useFormState(deleteWorldLineWithId, initialState);
  return (
    <form action={formAction}>
      <button type="submit">
        <FaTrashAlt className="size-5 text-lg hover:text-gray-700 cursor-pointer" />
      </button>
    </form>
  );
}

export default WorldLineDeleteButton