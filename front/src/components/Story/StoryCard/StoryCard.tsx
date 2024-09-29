import React from 'react';
import { Story } from '../../../models/Story';
import StoryDeleteButton from './StoryDeleteButton/StoryDeleteButton';
import StoryEditButton from './StoryEditButton/StoryEditButton';

interface StoryCardProps extends Story {
  onDelete: () => void; // onDeleteコールバックを追加
}

// 物語カードコンポーネント
// 引数 Story: 物語情報を格納するためのオブジェクト
const StoryCard: React.FC<StoryCardProps> = ({
  id,
  story_title,
  story,
  story_summary,
  events,
  world_line_id,
  onDelete
}) => {
  return (
    <div className="w-64 h-52 p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
      <header>
        <h1 className="text-lg font-semibold">{story_title}</h1>
        <div className="mt-1 text-sm line-clamp-3">{story_summary}</div>
      </header>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <StoryEditButton id={id || ''} worldLineId={world_line_id || ''} />
          <StoryDeleteButton id={id || ''} worldLineId={world_line_id || ''} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default StoryCard