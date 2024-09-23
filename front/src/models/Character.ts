export interface Character {
  id?: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  personality: string;
  other: string;
  world_line_id: string;
}