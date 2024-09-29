export interface Event {
  id?: string;
  event_title: string;
  date: string;
  characters: string[];
  event_description: string;
  world_line_id: string;
}

export interface EventWithCharacter extends Event {
  characterNames: string[];
}