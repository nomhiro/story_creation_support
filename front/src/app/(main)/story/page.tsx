import Link from 'next/link';
import { MdAddTask } from 'react-icons/md';

export default async function ExtraPage() {

  return (
    // 物語を書くためのページです。
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">物語を書く</h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>新規作成</div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">test</div>
    </div>
  );
}
