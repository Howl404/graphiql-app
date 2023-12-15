import { PropsWithChildren } from 'react';

import styles from './Dimming.module.scss';

export default function Dimming({ children }: PropsWithChildren) {
  return (
    <div className={styles.dimming}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
