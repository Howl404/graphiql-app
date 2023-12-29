import { Button } from '@mui/material';
import { FormEvent, useContext } from 'react';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import styles from './EndpointForm.module.scss';

type EndpointFormType = {
  inputValue: string;
  handleChangeEndpoint: (event: FormEvent) => void;
  handleChangeInput: (value: string) => void;
};

export default function EndpointForm({
  inputValue,
  handleChangeEndpoint,
  handleChangeInput,
}: EndpointFormType) {
  const { isDarkTheme } = useContext(AppThemeContext);

  return (
    <form className={styles.handlerEndpoint} onSubmit={handleChangeEndpoint}>
      <input
        className={cls(
          styles.inputEndpoint,
          isDarkTheme ? styles.inputDark : styles.inputLight
        )}
        value={inputValue}
        onChange={(event) => handleChangeInput(event.target.value)}
        onBlur={handleChangeEndpoint}
        type="text"
        placeholder="Enter endpoint"
        data-testid="endpoint-input"
      />
      <Button
        className={styles.updateBtn}
        type="submit"
        size="small"
        variant="contained"
        data-testid="endpoint-btn"
      >
        Update
      </Button>
    </form>
  );
}
