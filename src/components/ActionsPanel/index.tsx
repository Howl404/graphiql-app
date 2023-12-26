import { useContext } from 'react';

import Themes from 'enums/themes';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import copyIcon from 'assets/copy-icon.svg';
import docsIcon from 'assets/docs-icon.svg';
import prettifyIcon from 'assets/prettify-icon.svg';
import runIcon from 'assets/run-icon.svg';

import copyToClipboard from './utils/copyToClipboard';

import styles from './ActionsPanel.module.scss';

type ActionsPanelType = {
  query: string;
  sendQuery: () => void;
  toggleDocs: () => void;
  setPrettifiedQuery: () => void;
};

export default function ActionsPanel({
  query,
  sendQuery,
  toggleDocs,
  setPrettifiedQuery,
}: ActionsPanelType) {
  const { themeType } = useContext(AppThemeContext);
  const icons = [
    {
      onClick: sendQuery,
      src: runIcon,
      alt: 'Run',
      title: 'Send query',
      width: 35,
    },
    {
      onClick: toggleDocs,
      src: docsIcon,
      alt: 'Docs',
      title: 'Documentation',
      width: 26,
    },
    {
      onClick: setPrettifiedQuery,
      src: prettifyIcon,
      alt: 'Prettify',
      title: 'Prettify query',
      width: 30,
    },
    {
      onClick: () => copyToClipboard(query),
      src: copyIcon,
      alt: 'Copy',
      title: 'Copy query',
      width: 26,
    },
  ];

  return (
    <ul
      className={cls(
        styles.actions,
        themeType === Themes.Dark ? styles.actionsDark : styles.actionsLight
      )}
      data-testid="actions-panel"
    >
      {icons.map((icon) => (
        <li key={icon.alt}>
          <img
            className={styles.actionBtn}
            onClick={icon.onClick}
            src={icon.src}
            alt={icon.alt}
            title={icon.title}
            width={icon.width}
            data-testid={icon.alt}
          />
        </li>
      ))}
    </ul>
  );
}
