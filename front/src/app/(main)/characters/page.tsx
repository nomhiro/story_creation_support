'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdAddTask } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { WorldLine } from '../../../models/WorldLine';
import { Character as CharacterModel } from '../../../models/Character';
import WorldLineSelect from '../../../components/WorldLineSelect/WorldLineSelect';
import CharacterCard from '../../../components/Character/CharacterCard/CharacterCard';
import { deleteCharacter } from '../../../actions/Character'

// api/characterエンドポイントから全ての登場人物を取得
const getAllWorldLines = async (): Promise<WorldLine[]> => {
  const response = await fetch(`/api/world_line`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as WorldLine[];
}

export default function MainPage() {
  const [allWorldLines, setAllWorldLines] = useState<WorldLine[]>([]);
  const [selectedWorldLineId, setSelectedWorldLineId] = useState<string | undefined>(undefined);
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const router = useRouter(); // Move useRouter inside the component

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
      const fetchCharacters = async () => {
        const response = await fetch(`/api/character?world_line_id=${selectedWorldLineId}`, {
          cache: 'no-store',
        });

        if(response.status !== 200) throw new Error('Failed to fetch tasks');

        const data = await response.json();
        setCharacters(data.resources as CharacterModel[]);
      };
      fetchCharacters();
    }
  }, [selectedWorldLineId]);

  const handleSelect = (id: string) => {
    setSelectedWorldLineId(id);
    console.log(`Selected WorldLine ID in Parent: ${id}`);
  };

  const handleDelete = (id: string) => {
    setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== id));
  };

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <WorldLineSelect 
          worldLines={allWorldLines} 
          onSelect={handleSelect} 
          selectWorldLineId={selectedWorldLineId}
        />
        {selectedWorldLineId && <p>Selected World Line: {selectedWorldLineId}</p>}
        {selectedWorldLineId && (
          <div className="mt-8">
            <Link
              href={`/characters/${selectedWorldLineId}/new`}
              className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
            > 
              <MdAddTask className="size-5" />
              <div>登場人物を追加</div>
            </Link>
          </div>
        )}
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {characters.map((character) => (
          <CharacterCard 
            key={character.id} 
            {...character} 
            onDelete={() => character.id && handleDelete(character.id)}
          />
        ))}
      </div>
    </div>
  );
};