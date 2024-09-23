import { useFormState } from 'react-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { FormState, deleteCharacter } from '../../../../actions/Character'

interface CharacterDeleteButtonProps { 
  id: string
  worldLineId: string
  onDelete: () => void; // onDeleteコールバックを追加
}

const CharacterDeleteButton: React.FC<CharacterDeleteButtonProps> = ({ id, worldLineId, onDelete }) => {
  
  console.log('🚀 ~ CharacterDeleteButton ~ id, worldLineId: ', id, worldLineId)
  const deleteCharacterWithId = deleteCharacter.bind(null, id, worldLineId)
  const [_, formAction] = useFormState(async () => {
    try {
      await deleteCharacterWithId();
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

export default CharacterDeleteButton