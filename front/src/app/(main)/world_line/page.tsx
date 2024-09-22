import Link from 'next/link';
import { MdAddTask } from 'react-icons/md';
import { WorldLine } from '../../../models/WorldLine';
import WorldLineCard from '../../../components/WorldLineCard/WorldLineCard'

// api/world_lineエンドポイントから全ての世界線を取得
const getAllWorldLines = async (): Promise<WorldLine[]> => {
  const response = await fetch(`${process.env.URL}/api/world_line`, {
    cache: 'no-store',
  });

  if(response.status !== 200) throw new Error('Failed to fetch tasks');

  const data = await response.json();
  return data.resources as WorldLine[];
}

export default async function MainPage() {
  const allWorldLines = await getAllWorldLines();

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Link
          href="/world_line/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>世界線を追加</div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {allWorldLines.map((task) => (
          <WorldLineCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}