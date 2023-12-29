import { Button } from '@mui/material';
import { FormEvent } from 'react';

import useTranslation from 'hooks/useTranslation';

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
  const translation = useTranslation();

  return (
    <form className={styles.handlerEndpoint} onSubmit={handleChangeEndpoint}>
      <input
        className={styles.inputEndpoint}
        value={inputValue}
        onChange={(event) => handleChangeInput(event.target.value)}
        onBlur={handleChangeEndpoint}
        type="text"
        placeholder="Enter endpoint"
        data-testid="endpoint-input"
      />
      <Button
        type="submit"
        size="small"
        variant="contained"
        data-testid="endpoint-btn"
      >
        {translation('GraphQLPage.changeEndpoint')}
      </Button>
    </form>
  );
}
