import { WorldLine } from '../models/WorldLine';

// api/characterエンドポイントから全ての登場人物を取得
export const getAllWorldLines = async (): Promise<WorldLine[]> => {
  const response = await fetch(`/api/world_line`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as WorldLine[];
}