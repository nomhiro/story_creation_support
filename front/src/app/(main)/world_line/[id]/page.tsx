import React from 'react';
import WorldLineForm from '../../../../components/WorldLineForm/WorldLineForm';
import { WorldLine } from '../../../../models/WorldLine';

interface EditWorldLinePageProps {
  params: {id: string}
}

const getWorldLine = async (id: string): Promise<WorldLine> => {
  const response = await fetch(
    `${process.env.URL}/api/world_line/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (response.status !== 200) throw new Error('Failed to fetch worldLines');
  const data = await response.json();
  return data.resources[0] as WorldLine;
};

const EditWorldLinePage: React.FC<EditWorldLinePageProps> = async ({ params }) => {
  const id = params.id

  // idがnewの場合は新規作成ページを表示
  if (id === 'new') {
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">新規作成</h2>
        <WorldLineForm />
      </div>
    );
  } else {
    const worldLine: WorldLine = await getWorldLine(id);
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">編集</h2>
        <WorldLineForm worldLine={worldLine} /> 
      </div>
    );
  }
};

export default EditWorldLinePage