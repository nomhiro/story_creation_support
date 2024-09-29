"use client"

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { FormState, upsertEvent } from '../../../actions/Event';
import { Event } from '../../../models/Event';
import { Character } from '../../../models/Character';
import { getCharactersByWorldLineId } from '../../../utils/characterService';

interface EventFormProps {
  Event?: Event;
  world_line_id: string;
}

const EventForm: React.FC<EventFormProps> = ({ Event, world_line_id }) => {
  const initialState: FormState = { error: "" }
  const isEditMode = Event !== undefined;
  const [state, formAction] = useFormState(upsertEvent, initialState)
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>(Event?.characters || []);

  const buttonText = isEditMode ? "更新" : "新規作成";

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await getCharactersByWorldLineId(world_line_id);
        setCharactersList(characters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [world_line_id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedCharacters((prevCharacters) => {
      if (checked) {
        return [...prevCharacters, value];
      }
      return prevCharacters.filter((characterId) => characterId !== value);
    });
  };

  // useEffect(() => {
  //   console.log(`Selected Characters: ${selectedCharacters}`);
  // }, [selectedCharacters]);

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
    if (Event?.id) {
      formData.append('id', Event.id.toString());
    }
    if (world_line_id) {
      formData.append('world_line_id', world_line_id);
    }
    // 既存のcharactersフィールドを削除
    formData.delete('characters');
    selectedCharacters.forEach(character => {
      formData.append('characters', character);
    });
    console.log(`🚀 ~ handleFormAction ~ selectedCharacters: ${selectedCharacters}`);
    formAction(formData);
  }
  
  return (
    <div className="mt-10 mx-auto w-full max-w-2xl px-4">
    <form action={handleFormAction}>
      <div>
        <label htmlFor="event_title" className="block text-sm font-medium text-blue-900">
          概要
        </label>
        <input
          type="text"
          id="event_title"
          name="event_title"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Event ? Event.event_title : ""}
        />
      </div>
      <div className="mt-6">
        <label htmlFor="date" className="block text-sm font-medium text-blue-900">
          日付
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Event ? Event.date : ""}
          list="gender-options"
          />
      </div>
      <div className="mt-6">
        <label htmlFor="characters" className="block text-sm font-medium text-blue-900">
          関係者
        </label>
        <div className="block mt-2">
          {charactersList.map((character) => (
            <div key={character.id} className="flex items-center">
              <input
                type="checkbox"
                id={`character-${character.id}`}
                name="characters"
                value={character.id}
                onChange={handleCheckboxChange}
                checked={selectedCharacters.includes((character.id ?? '').toString())}
                className="mr-2"
              />
              <label htmlFor={`character-${character.id}`} className="text-black">
                {character.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="event_description" className="block text-sm font-medium text-blue-900">
          出来事の詳細
        </label>
        <textarea
          id="event_description"
          name="event_description"
          rows={5}
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Event ? Event.event_description : ""}
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

export default EventForm