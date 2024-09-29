"use client"

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FormState, upsertWorldLine } from '../../actions/WorldLine';
import { WorldLine } from '../../models/WorldLine';

const WorldLineForm = ({ worldLine }: { worldLine?: WorldLine }) => {
  const initialState: FormState = { error: "" }
  const isEditMode = worldLine !== undefined;
  const [state, formAction] = useFormState(upsertWorldLine, initialState)

  const buttonText = isEditMode ? "更新" : "新規作成";

  const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
      <button
        type="submit"
        className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        disabled={pending}
      >
        {buttonText}
      </button>
    );
  }

  const handleFormAction = (formData: FormData) => {
    if (worldLine?.id) {
      formData.append('id', worldLine.id.toString());
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log('🚀 ~ handleFormAction ~ formData id:', formData.get('id'));
    formAction(formData);
  }
  
  return (
    <div className="mt-10 mx-auto w-full max-w-2xl px-4">
    <form action={handleFormAction}>
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
          defaultValue={worldLine ? worldLine.world_line : ""}
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
          defaultValue={worldLine ? worldLine.era : ""}
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
          defaultValue={worldLine ? worldLine.country : ""}
        />
      </div>
      <div className="mt-6">
        <label htmlFor="other" className="block text-sm font-medium text-blue-900">
          その他
        </label>
        <textarea
          id="other"
          name="other"
          rows={5}
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={worldLine ? worldLine.other : ""}
        />
        <div className="flex justify-end mt-8">
          <SubmitButton />
        </div>
      </div>
      {state.error && <p className="mt-4 text-red-500">{state.error}</p>}
    </form>
    </div>  
  );
}

export default WorldLineForm