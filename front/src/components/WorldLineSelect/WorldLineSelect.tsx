import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { WorldLine } from '../../models/WorldLine';

interface WorldLineSelectProps {
  worldLines: WorldLine[];
  onSelect: (id: string) => void;
  selectWorldLineId?: string;
}

const WorldLineSelect: React.FC<WorldLineSelectProps> = ({ worldLines, onSelect, selectWorldLineId }) => {
  // const [selectedWorldLineId, setSelectedWorldLineId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectWorldLineId) {
      onSelect(selectWorldLineId);
    }
  }, [selectWorldLineId, onSelect]);

  const options = worldLines.map((worldLine) => ({
    value: worldLine.id,
    label: worldLine.world_line,
  }));

  const handleChange = (selectedOption: any) => {
    onSelect(selectedOption ? selectedOption.value : '');
  };

  const selectedOption = options.find(option => option.value === selectWorldLineId);

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '300px', // 最大幅を300pxに設定
    }),
  };

  return (
    <div>
      <Select
        id="worldLineSelect"
        instanceId="worldLineSelect"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="--- 物語はどれ？ ---"
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default WorldLineSelect;