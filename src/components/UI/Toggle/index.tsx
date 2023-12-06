import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

type ToggleProps = {
  handleClick: (value: string) => void;
  optionsName: string;
  firstOption: string;
  secondOption: string;
};

export default function ToggleButtons({
  handleClick,
  optionsName,
  firstOption,
  secondOption,
}: ToggleProps) {
  const [value, setValue] = useState<string>(firstOption);

  const handleOption = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleOption}
      aria-label={optionsName}
    >
      <ToggleButton
        size="small"
        value={firstOption}
        onClick={() => handleClick(firstOption)}
        disabled={value === firstOption}
        aria-label={firstOption}
      >
        {firstOption}
      </ToggleButton>
      <ToggleButton
        size="small"
        value={secondOption}
        onClick={() => handleClick(secondOption)}
        disabled={value === secondOption}
        aria-label={secondOption}
      >
        {secondOption}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
