import React from 'react';
import { WorldLine } from '../../models/WorldLine';
import TaskDeleteButton from './WorldLineDeleteButton/WorldLineDeleteButton';
import TaskEditButton from './WorldLineEditButton/WorldLineEditBurron';

// 世界線カードコンポーネント
// 引数 WorldLine: 世界線情報を格納するためのオブジェクト
const TaskCard: React.FC<WorldLine> = ({
  id,
  world_line,
  era,
  country,
  other,
}) => {
  return (
    <div className="w-64 h-52 p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
      <header>
        <h1 className="text-lg font-semibold">{world_line}</h1>
        <div className="mt-1 text-sm line-clamp-3">{era}</div>
        <div className="text-sm">{country}</div>
      </header>
      <div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 line-clamp-3">{other}</div>
          <div className="flex gap-4">
            <TaskEditButton id={id!} />
            <TaskDeleteButton id={id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard