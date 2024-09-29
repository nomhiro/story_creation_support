'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { MdAddTask } from 'react-icons/md';
import { WorldLine as WorldLineModel } from '../../../models/WorldLine';
import { Event as EventModel } from '../../../models/Event';
import { getAllWorldLines } from '../../../utils/worldLineService';
import WorldLineSelect from '../../../components/WorldLineSelect/WorldLineSelect';
import EventList from '../../../components/Event/EventList/EventList';
import { getEventsByWorldLineId } from '../../../utils/eventService';

export default function ExtraPage() {
  const [allWorldLines, setAllWorldLines] = useState<WorldLineModel[]>([]);
  const [selectedWorldLineId, setSelectedWorldLineId] = useState<string | undefined>(undefined);
  // const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    const fetchWorldLines = async () => {
      const worldLines = await getAllWorldLines();
      setAllWorldLines(worldLines);
    };
    fetchWorldLines();
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const world_line_id = searchParams.get('world_line_id');
    if (world_line_id) {
      setSelectedWorldLineId(world_line_id);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setSelectedWorldLineId(id);
    console.log(`Selected WorldLine ID in Parent: ${id}`);
  };


  return (
    // 出来事を決めるためのページです。
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <WorldLineSelect 
          worldLines={allWorldLines} 
          onSelect={handleSelect} 
          selectWorldLineId={selectedWorldLineId}
        />
        {selectedWorldLineId && (
          <div className="mt-8">
            <Link
              href={`/events/${selectedWorldLineId}/new`}
              className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
            > 
              <MdAddTask className="size-5" />
              <div>出来事を追加</div>
            </Link>
          </div>
        )}
      </header>
      {selectedWorldLineId && (
        <EventList selectedWorldLineId={selectedWorldLineId} />
      )}
    </div>
  );
}