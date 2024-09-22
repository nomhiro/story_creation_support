"use client"

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FormState, updateWorldLine } from '../../../actions/WorldLine';
import { WorldLine } from '../../../models/WorldLine';

const EditWorldLineForm = ({ worldLine }: { worldLine: WorldLine }) => {
  const [wl, setWL] = useState<string>(worldLine.world_line);
  const [e, setE] = useState<string>(worldLine.era);
  const [c, setC] = useState<string>(worldLine.country);
  const [o, setO] = useState<string>(worldLine.other);

  const updateWorldLineWithId = updateWorldLine.bind(null, worldLine.id as string);
  const initialState: FormState = { error: '' };
  const [state, formAction] = useFormState(updateWorldLineWithId, initialState);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        disabled={pending}
      >
        編集
      </button>
    );
  };

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
            value={wl}
            onChange={(e) => setWL(e.target.value)}
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="era" className="block text-sm font-medium text-blue-900">
            時代
          </label>
          <input
            type="text"
            id="era"
            name="era"
            value={e}
            onChange={(e) => setE(e.target.value)}
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="country" className="block text-sm font-medium text-blue-900">
            国
          </label>
          <input
            type="string"
            id="country"
            name="country"
            value={c}
            onChange={(e) => setC(e.target.value)}
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
            rows={5}
            value={o}
            onChange={(e) => setO(e.target.value)}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          />
        </div>

        <SubmitButton />
        {state.error && <p className="mt-4 text-red-500">{state.error}</p>}
      </form>
    </div>
  );
}

export default EditWorldLineForm