"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { FormState, createWorldLine } from '../../../actions/WorldLine';

const NewWorldLineForm = () => {
  const initialState: FormState = { error: "" }
  const [state, formAction] = useFormState(createWorldLine, initialState)

  const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
      <button
        type="submit"
        className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        disabled={pending}
      >
        新規作成
      </button>
    );
  }
  
  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      <form action={formAction}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-blue-900">
            世界線
          </label>
          <input
            type="text"
            id="world_line"
            name="world_line"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-blue-900">
            時代
          </label>
          <input
            type="text"
            id="era"
            name="era"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="country" className="block text-sm font-medium text-blue-900">
            国
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="other" className="block text-sm font-medium text-blue-900">
            その他
          </label>
          <textarea
            id="other"
            name="other"
            required
            rows={5}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <SubmitButton />
        {state.error && <p className="mt-4 text-red-500">{state.error}</p>}
      </form>
    </div>
  );
}

export default NewWorldLineForm