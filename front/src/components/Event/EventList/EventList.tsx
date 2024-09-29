import React, { useState, useEffect } from 'react';

import { Event as EventModel, EventWithCharacter } from '../../../models/Event';
import EventDeleteButton from './EventDeleteButton/EventDeleteButton';
import EventEditButton from './EventEditButton/EventEditButton';
import { getEventsWithCharacterById } from '../../../utils/eventService';

interface EventListProps {
  selectedWorldLineId: string;
}

const EventList: React.FC<EventListProps> = ({ selectedWorldLineId }) => {
  const [events, setEvents] = useState<EventWithCharacter[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEventsWithCharacterById(selectedWorldLineId);
      setEvents(data as EventWithCharacter[]);
    };
    fetchEvents();
  }, [selectedWorldLineId]);

  const handleDelete = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">タイトル</th>
            <th className="py-2 px-4 border-b">日付</th>
            <th className="py-2 px-4 border-b">キャラクター</th>
            <th className="py-2 px-4 border-b">説明</th>
            <th className="py-2 px-4 border-b">アクション</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{event.event_title}</td>
              <td className="py-2 px-4 border-b">{event.date}</td>
              <td className="py-2 px-4 border-b">{event.characterNames.join(', ')}</td>
              <td className="py-2 px-4 border-b">{event.event_description}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                {typeof event.id !== 'undefined' && (
                  <>
                    <EventEditButton id={event.id} worldLineId={event.world_line_id} />
                    <EventDeleteButton id={event.id} worldLineId={event.world_line_id} onDelete={() => event.id && handleDelete(event.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;