import React from 'react';
import { Character } from '../../../models/Character';
import CharacterDeleteButton from './CharacterDeleteButton/CharacterDeleteButton';
import CharacterEditButton from './CharacterEditButton/CharacterEditButton';

interface CharacterCardProps extends Character {
  onDelete: () => void; // onDeleteコールバックを追加
}

// 物語カードコンポーネント
// 引数 Character: 物語情報を格納するためのオブジェクト
const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  gender,
  age,
  personality,
  other,
  world_line_id,
  onDelete
}) => {
  return (
    <div className="w-64 h-52 p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
      <header>
        <h1 className="text-lg font-semibold">{name}</h1>
        <div className="text-sm text-gray-600">{gender}, {age}</div>
        <div className="mt-1 text-sm line-clamp-3">{personality}</div>
      </header>
      <div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 line-clamp-3">{other}</div>
          <div className="flex gap-4">
            <CharacterEditButton id={id || ''} worldLineId={world_line_id || ''} />
            <CharacterDeleteButton id={id || ''} worldLineId={world_line_id || ''} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard