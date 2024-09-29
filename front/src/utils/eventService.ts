import { json } from 'stream/consumers';

import { Event, EventWithCharacter } from '../models/Event';
import { getCharacterById } from './characterService';

// api/eventエンドポイントからworld_line_idに紐づく登場人物を取得
export const getEventsByWorldLineId = async (worldLineId: string): Promise<Event[]> => {
  const response = await fetch(`/api/event?world_line_id=${encodeURIComponent(worldLineId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as Event[];
}

// api/eventエンドポイントからevent_idに紐づく出来事を取得
// 取得したeventのcharactersリストのcharacter_idをキーにして、Characterエンドポイントから登場人物を取得
// 取得した登場人物名を追加したEventWithCharacterを返す
export const getEventsWithCharacterById = async (worldLineId: string): Promise<EventWithCharacter[]> => {
  const events = await getEventsByWorldLineId(worldLineId);

  const eventsWithCharacterName = await Promise.all(events.map(async (event) => {
    const characterNames = await Promise.all(event.characters.map(async (characterId) => {
      try {
        const character = await getCharacterById(characterId);
        if (!character || !character.name) {
          throw new Error(`Character with id ${characterId} not found or has no name`);
        }
        return character.name;
      } catch (error) {
        console.error(`Error fetching character with id ${characterId}:`, error);
        throw new Error(`Error fetching character with id ${characterId}: ${error}`);
      }
    }));

    return {
      ...event,
      characterNames: characterNames,
    } as EventWithCharacter;
  }));

  return eventsWithCharacterName;
}

// api/characterエンドポイントからcharacter_idに紐づく登場人物を取得
export const getEventById = async (eventId: string): Promise<Event> => {
  const response = await fetch(`/api/event/${encodeURIComponent(eventId)}`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources[0] as Event;
}