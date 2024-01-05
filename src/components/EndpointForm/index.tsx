import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { FormEvent, useContext } from 'react';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import { TranslationKeys } from 'hooks/useTranslation.ts';

import styles from './EndpointForm.module.scss';

type EndpointFormType = {
  inputValue: string;
  handleChangeEndpoint: (event: FormEvent) => void;
  handleChangeInput: (value: string) => void;
  translation: (key: TranslationKeys) => string;
};

export default function EndpointForm({
  inputValue,
  handleChangeEndpoint,
  handleChangeInput,
  translation,
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
        placeholder={translation('MainPage.endpointPlaceholder')}
        data-testid="endpoint-input"
      />
      <Button
        className={styles.updateBtn}
        type="submit"
        size="small"
        variant="contained"
        data-testid="endpoint-btn"
      >
        <RefreshIcon />
      </Button>
    </form>
  );
}
