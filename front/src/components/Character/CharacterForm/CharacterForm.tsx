"use client"

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FormState, upsertCharacter } from '../../../actions/Character';
import { Character } from '../../../models/Character';

interface CharacterFormProps {
  Character?: Character;
  world_line_id: string;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ Character, world_line_id }) => {
  const initialState: FormState = { error: "" }
  const isEditMode = Character !== undefined;
  const [state, formAction] = useFormState(upsertCharacter, initialState)

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
    if (Character?.id) {
      formData.append('id', Character.id.toString());
    }
    console.log(`🚀 ~ handleFormAction ~ world_line_id: ${world_line_id}`);
    if (world_line_id) {
      formData.append('world_line_id', world_line_id);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log('🚀 ~ handleFormAction ~ formData id:', formData.get('id'));
    console.log('🚀 ~ handleFormAction ~ formData world_line_id:', formData.get('world_line_id'));
    formAction(formData);
  }
  
  return (
    <div className="mt-10 mx-auto w-full max-w-2xl px-4">
    <form action={handleFormAction}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-900">
          氏名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Character ? Character.name : ""}
        />
      </div>
      <div className="mt-6">
        <label htmlFor="gender" className="block text-sm font-medium text-blue-900">
          性別
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Character ? Character.gender : ""}
          list="gender-options"
          />
          <datalist id="gender-options">
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </datalist>
      </div>
      <div className="mt-6">
        <label htmlFor="age" className="block text-sm font-medium text-blue-900">
          年齢
        </label>
        <input
          type="number"
          id="age"
          name="age"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Character ? Character.age : ""}
        />
      </div>
      < div className="mt-6">
        <label htmlFor="personality" className="block text-sm font-medium text-blue-900">
          性格
        </label>
        <textarea
          id="personality"
          name="personality"
          rows={3}
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Character ? Character.personality : ""}
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
          defaultValue={Character ? Character.other : ""}
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

export default CharacterForm