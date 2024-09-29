import { useFormState } from 'react-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { FormState, deleteStory } from '../../../../utils/storyService'

interface StoryDeleteButtonProps { 
  id: string
  worldLineId: string
  onDelete: () => void; // onDeleteコールバックを追加
}

const StoryDeleteButton: React.FC<StoryDeleteButtonProps> = ({ id, worldLineId, onDelete }) => {
  
  console.log('🚀 ~ StoryDeleteButton ~ id, worldLineId: ', id, worldLineId)
  const deleteStoryWithId = deleteStory.bind(null, id, worldLineId)
  const [_, formAction] = useFormState(async () => {
    try {
      await deleteStoryWithId();
      onDelete(); // 削除成功後にコールバックを呼び出す
    } catch (error: any) {
      console.error(error);
    }
  }, undefined);

  return (
    <form action={formAction}>
      <button type="submit">
        <FaTrashAlt className="size-5 text-lg hover:text-gray-700 cursor-pointer" />
      </button>
    </form>
  );
}

export default StoryDeleteButton