import React from 'react';
import EventForm from '../../../../../components/Event/EventForm/EventForm';
import { Event } from '../../../../../models/Event';

interface EditEventPageProps {
  params: {
    world_line_id: string,
    id: string
  }
}

const getEvent = async (id: string): Promise<Event> => {
  const response = await fetch(
    `${process.env.URL}/api/event/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (response.status !== 200) throw new Error('Failed to fetch Events');
  const data = await response.json();
  return data.resources[0] as Event;
};

const EditEventPage: React.FC<EditEventPageProps> = async ({ params }) => {
  const id = params.id

  // idがnewの場合は新規作成ページを表示
  if (id === 'new') {
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">新規作成</h2>
        <EventForm world_line_id={params.world_line_id} />
      </div>
    );
  } else {
    const Event: Event = await getEvent(id);
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">編集</h2>
        <EventForm Event={Event} world_line_id={params.world_line_id} /> 
      </div>
    );
  }
};

export default EditEventPage