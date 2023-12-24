import { PropsWithChildren } from 'react';

import styles from './Dimming.module.scss';

export default function Dimming({ children }: PropsWithChildren) {
  return (
    <div className={styles.dimming} data-testid="dimming">
      <div className={styles.content} data-testid="content">
        {children}
      </div>
    </div>
  );
}
