import React from 'react';
import EditWorldLineForm from '../../../../../components/WorldLineForm/EditWorldLineForm/EditWorldLineForm';
import { WorldLine } from '../../../../../models/WorldLine';

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
  const worldLine: WorldLine = await getWorldLine(id);
  return (
    <div className="flex flex-col justify-center py-20">
      <h2 className="text-center text-2xl font-bold">編集</h2>
      <EditWorldLineForm worldLine={worldLine} />
    </div>
  );
};

export default EditWorldLinePage