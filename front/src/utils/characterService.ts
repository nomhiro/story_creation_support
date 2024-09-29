import { Character } from '../models/Character';

// api/characterエンドポイントからworld_line_idに紐づく登場人物を取得
export const getCharactersByWorldLineId = async (worldLineId: string): Promise<Character[]> => {
  const response = await fetch(`/api/character?world_line_id=${encodeURIComponent(worldLineId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as Character[];
}

// api/characterエンドポイントからcharacter_idに紐づく登場人物を取得
export const getCharacterById = async (characterId: string): Promise<Character> => {
  const response = await fetch(`/api/character/${encodeURIComponent(characterId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources[0] as Character;
}