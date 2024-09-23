import React from 'react';
import CharacterForm from '../../../../../components/Character/CharacterForm/CharacterForm';
import { Character } from '../../../../../models/Character';

interface EditCharacterPageProps {
  params: {
    world_line_id: string,
    id: string
  }
}

const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(
    `${process.env.URL}/api/character/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (response.status !== 200) throw new Error('Failed to fetch Characters');
  const data = await response.json();
  return data.resources[0] as Character;
};

const EditCharacterPage: React.FC<EditCharacterPageProps> = async ({ params }) => {
  const id = params.id

  // idがnewの場合は新規作成ページを表示
  if (id === 'new') {
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">新規作成</h2>
        <CharacterForm world_line_id={params.world_line_id} />
      </div>
    );
  } else {
    const Character: Character = await getCharacter(id);
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">編集</h2>
        <CharacterForm Character={Character} world_line_id={params.world_line_id} /> 
      </div>
    );
  }
};

export default EditCharacterPage