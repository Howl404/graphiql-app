import { PropsWithChildren } from 'react';

import styles from './Overlay.module.scss';

export default function Overlay({ children }: PropsWithChildren) {
  return (
    <div className={styles.overlay} data-testid="overlay">
      <div className={styles.content} data-testid="content">
        {children}
      </div>
    </div>
  );
}
