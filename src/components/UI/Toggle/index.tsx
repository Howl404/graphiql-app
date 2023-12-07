import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useContext } from 'react';
import { LangContext } from 'src/context/LangContext';
import { Languages } from 'src/types';

type ToggleProps = {
  optionsName: string;
  firstOption: string;
  secondOption: string;
};

export default function ToggleButtons({
  optionsName,
  firstOption,
  secondOption,
}: ToggleProps) {
  const { lang: value, setLang: setValue } = useContext(LangContext);

  const handleOption = (
    event: React.MouseEvent<HTMLElement>,
    newLang: Languages
  ) => {
    setValue(newLang);
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
        disabled={value === firstOption}
        aria-label={firstOption}
      >
        {firstOption}
      </ToggleButton>
      <ToggleButton
        size="small"
        value={secondOption}
        disabled={value === secondOption}
        aria-label={secondOption}
      >
        {secondOption}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
