import React from 'react';
import StoryForm from '../../../../../components/Story/StoryForm/StoryForm';
import { Story } from '../../../../../models/Story';

interface EditStoryPageProps {
  params: {
    world_line_id: string,
    id: string
  }
}

const getStory = async (id: string): Promise<Story> => {
  const response = await fetch(
    `${process.env.URL}/api/story/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (response.status !== 200) throw new Error('Failed to fetch Storys');
  const data = await response.json();
  return data.resources[0] as Story;
};

const EditStoryPage: React.FC<EditStoryPageProps> = async ({ params }) => {
  const id = params.id

  // idがnewの場合は新規作成ページを表示
  if (id === 'new') {
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">新規作成</h2>
        <StoryForm world_line_id={params.world_line_id} />
      </div>
    );
  } else {
    const Story: Story = await getStory(id);
    return (
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">編集</h2>
        <StoryForm Story={Story} world_line_id={params.world_line_id} /> 
      </div>
    );
  }
};

export default EditStoryPage