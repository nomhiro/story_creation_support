export default async function MainPage() {
  return (
    <main className="flex flex-col text-gray-800 w-full h-full overflow-y-auto">
      {/* 物語作成サポートツールのホーム画面 */}
      <div className="flex bg-slate-300 h-full p-4 justify-center">
        <div className="flex flex-col items-center justify-center w-1/2">
          <h1 className="text-4xl font-bold">物語作成サポートツール</h1>
          <p className="mt-4 text-lg">
            物語作成をサポートするためのツールです。
          </p>
        </div>
      </div>
    </main>
  );
}
