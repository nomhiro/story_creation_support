import React from 'react'
import NewWorldLineForm from '../../../../components/WorldLineForm/NewWorldLineForm/NewWorldLineForm'

const NewTaskPage = () => {
  return (
    <div className='flex flex-col justify-center py-20'>
      <h2 className='text-center text-2xl font-bold'>世界線の作成</h2>
      <NewWorldLineForm />
    </div>
  )
}

export default NewTaskPage