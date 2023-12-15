import copyIcon from 'assets/copy-icon.svg';
import docsIcon from 'assets/docs-icon.svg';
import prettifyIcon from 'assets/prettify-icon.svg';
import runIcon from 'assets/run-icon.svg';

import styles from './ActionsPanel.module.scss';
import copyToClipboard from './utils/copyToClipboard';

type ActionsPanelType = {
  query: string;
  sendQuery: () => void;
  setPrettifiedQuery: () => void;
};

export default function ActionsPanel({
  query,
  sendQuery,
  setPrettifiedQuery,
}: ActionsPanelType) {
  return (
    <ul className={styles.actions}>
      <li>
        <img
          className={styles.actionBtn}
          onClick={sendQuery}
          src={runIcon}
          alt="Run"
          title="Send query"
          width={35}
        />
      </li>
      <li>
        <img
          className={styles.actionBtn}
          src={docsIcon}
          alt="Docs"
          title="Documentation"
          width={26}
        />
      </li>
      <li>
        <img
          className={styles.actionBtn}
          src={prettifyIcon}
          alt="Prettify"
          title="Prettify query"
          width={30}
          onClick={setPrettifiedQuery}
        />
      </li>
      <li>
        <img
          className={styles.actionBtn}
          src={copyIcon}
          alt="Copy"
          title="Copy query"
          width={26}
          onClick={() => copyToClipboard(query)}
        />
      </li>
    </ul>
  );
}
