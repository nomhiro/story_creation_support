import { useFormState } from 'react-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { FormState, deleteEvent } from '../../../../actions/Event'

interface EventDeleteButtonProps { 
  id: string
  worldLineId: string
  onDelete: () => void; // onDeleteコールバックを追加
}

const EventDeleteButton: React.FC<EventDeleteButtonProps> = ({ id, worldLineId, onDelete }) => {
  
  const deleteEventWithId = deleteEvent.bind(null, id, worldLineId)
  const [_, formAction] = useFormState(async () => {
    try {
      await deleteEventWithId();
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

export default EventDeleteButton