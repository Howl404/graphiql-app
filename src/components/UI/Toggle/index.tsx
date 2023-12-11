import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Languages from 'src/enums/languages';

type ToggleProps = {
  optionsName: string;
  firstOption: string;
  secondOption: string;
  value: Languages;
  setValue: (value: Languages) => void;
};

export default function ToggleButtons({
  optionsName,
  firstOption,
  secondOption,
  value,
  setValue,
}: ToggleProps) {
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
        data-testid={firstOption}
      >
        {firstOption}
      </ToggleButton>
      <ToggleButton
        size="small"
        value={secondOption}
        disabled={value === secondOption}
        aria-label={secondOption}
        data-testid={secondOption}
      >
        {secondOption}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
