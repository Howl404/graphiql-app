import { Button } from '@mui/material';
import { FormEvent } from 'react';

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
  return (
    <form className={styles.handlerEndpoint} onSubmit={handleChangeEndpoint}>
      <input
        className={styles.inputEndpoint}
        value={inputValue}
        onChange={(event) => handleChangeInput(event.target.value)}
        onBlur={handleChangeEndpoint}
        type="text"
        placeholder="Enter endpoint"
      />
      <Button type="submit" size="small" variant="contained">
        Change endpoint
      </Button>
    </form>
  );
}
