'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdAddTask } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { WorldLine } from '../../../models/WorldLine';
import { getAllWorldLines } from '../../../utils/worldLineService';
import { Story as StoryModel } from '../../../models/Story';
import WorldLineSelect from '../../../components/WorldLineSelect/WorldLineSelect';
import StoryCard from '../../../components/Story/StoryCard/StoryCard';

export default function MainPage() {
  const [allWorldLines, setAllWorldLines] = useState<WorldLine[]>([]);
  const [selectedWorldLineId, setSelectedWorldLineId] = useState<string | undefined>(undefined);
  const [storys, setStorys] = useState<StoryModel[]>([]);
  
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

  useEffect(() => {
    if (selectedWorldLineId) {
      const fetchStorys = async () => {
        const response = await fetch(`/api/story?world_line_id=${selectedWorldLineId}`, {
          cache: 'no-store',
        });

        if(response.status !== 200) throw new Error('Failed to fetch tasks');

        const data = await response.json();
        setStorys(data.resources as StoryModel[]);
      };
      fetchStorys();
    }
  }, [selectedWorldLineId]);

  const handleSelect = (id: string) => {
    setSelectedWorldLineId(id);
    console.log(`Selected WorldLine ID in Parent: ${id}`);
  };

  const handleDelete = (id: string) => {
    setStorys((prevStorys) => prevStorys.filter((story) => story.id !== id));
  };

  return (
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
              href={`/storys/${selectedWorldLineId}/new`}
              className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
            > 
              <MdAddTask className="size-5" />
              <div>物語（章）を追加</div>
            </Link>
          </div>
        )}
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {storys.map((story) => (
          <StoryCard 
            key={story.id} 
            {...story} 
            onDelete={() => story.id && handleDelete(story.id)}
          />
        ))}
      </div>
    </div>
  );
};