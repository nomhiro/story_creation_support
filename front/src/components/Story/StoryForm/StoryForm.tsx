"use client"

import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { FormState, upsertStory } from '../../../utils/storyService';
import { Story } from '../../../models/Story';
import { Event } from '../../../models/Event';
import { getEventsByWorldLineId } from '../../../utils/eventService'; 

interface StoryFormProps {
  Story?: Story;
  world_line_id: string;
}

const StoryForm: React.FC<StoryFormProps> = ({ Story, world_line_id }) => {
  const initialState: FormState = { error: "" }
  const isEditMode = Story !== undefined;
  const [state, formAction] = useFormState(upsertStory, initialState)
  const [eventList, setEventList] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(Story?.events || []);

  const buttonText = isEditMode ? "更新" : "新規作成";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEventsByWorldLineId(world_line_id);
        setEventList(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [world_line_id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedEvents((prevEvents) => {
      if (checked) {
        return [...prevEvents, value];
      }
      return prevEvents.filter((eventId) => eventId !== value);
    });
  };

  // useEffect(() => {
  //   console.log(`Selected Events: ${selectedEvents}`);
  // }, [selectedEvents]);

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
    if (Story?.id) {
      formData.append('id', Story.id.toString());
    }
    console.log(`🚀 ~ handleFormAction ~ world_line_id: ${world_line_id}`);
    if (world_line_id) {
      formData.append('world_line_id', world_line_id);
    }
    // 既存のEventsフィールドを削除
    formData.delete('events');
    selectedEvents.forEach((eventId) => {
      formData.append('events', eventId);
    });
    console.log(`🚀 ~ handleFormAction ~ selectedEvents: ${selectedEvents}`);
    formAction(formData);
  }
  
  return (
    <div className="mt-10 mx-auto w-full max-w-4xl mx-4">
    <form action={handleFormAction}>
      <div>
        <label htmlFor="story_title" className="block text-sm font-medium text-blue-900">
          タイトル
        </label>
        <input
          type="text"
          id="story_title"
          name="story_title"
          required
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Story ? Story.story_title : ""}
        />
      </div>
      <div className="mt-6">
        <label htmlFor="events" className="block text-sm font-medium text-blue-900">
          ストーリーに含めるイベント
        </label>
        <div className="block mt-2">
          {eventList.map((event) => (
            <div key={event.id} className="flex items-center">
              <input
                type="checkbox"
                id={`event-${event.id}`}
                name="event"
                value={event.id}
                onChange={handleCheckboxChange}
                checked={selectedEvents.includes((event.id ?? '').toString())}
                className="mr-2"
              />
              <label htmlFor={`event-${event.id}`} className="text-black">
                {event.event_title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="story" className="block text-sm font-medium text-blue-900">
          ストーリー
        </label>
        <textarea
          id="story"
          name="story"
          rows={30}
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
          defaultValue={Story ? Story.story : ""}
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

export default StoryForm