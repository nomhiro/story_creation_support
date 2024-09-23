import React from 'react';
import { WorldLine } from '../../models/WorldLine';
import WorldLineDeleteButton from './WorldLineDeleteButton/WorldLineDeleteButton';
import WoldLineEditButton from './WorldLineEditButton/WorldLineEditButton';

// 物語カードコンポーネント
// 引数 WorldLine: 物語情報を格納するためのオブジェクト
const WorldLineCard: React.FC<WorldLine> = ({
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
            <WoldLineEditButton id={id!} />
            <WorldLineDeleteButton id={id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldLineCard