import React, { useState, useEffect } from 'react';
import { Character } from '../../../models/Character';

interface CharacterSelectProps {
  Characters: Character[];
  onSelect: (id: string) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ Characters, onSelect }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectedCharacterId) {
      onSelect(selectedCharacterId);
    }
  }, [selectedCharacterId, onSelect]);

  return (
    <div>
      <label htmlFor="CharacterSelect">Select World Line:</label>
      <select
        id="CharacterSelect"
        value={selectedCharacterId}
        onChange={(e) => setSelectedCharacterId(e.target.value)}
      >
        <option value="" disabled>Select a world line</option>
        {Characters.map((Character) => (
          <option key={Character.id} value={Character.id}>
            {Character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelect;