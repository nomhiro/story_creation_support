export interface Story {
  id?: string;
  story_title: string;
  story: string;
  story_summary: string;
  events: string[];
  world_line_id: string;
}

export interface StoryWithEvent extends Story {
  event_names: string[];
}