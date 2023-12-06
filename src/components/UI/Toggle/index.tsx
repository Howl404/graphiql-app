import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useContext } from 'react';
import { LangContext } from 'src/context/LangContext';

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
  const { lang, setLang } = useContext(LangContext);

  const handleOption = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string
  ) => {
    setLang(newLang);
  };

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={handleOption}
      aria-label={optionsName}
    >
      <ToggleButton
        size="small"
        value={firstOption}
        disabled={lang === firstOption}
        aria-label={firstOption}
      >
        {firstOption}
      </ToggleButton>
      <ToggleButton
        size="small"
        value={secondOption}
        disabled={lang === secondOption}
        aria-label={secondOption}
      >
        {secondOption}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
