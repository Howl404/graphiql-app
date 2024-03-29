import { useContext } from 'react';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import useTranslation from 'hooks/useTranslation';

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
  const translation = useTranslation();

  const { isDarkTheme } = useContext(AppThemeContext);

  const icons = [
    {
      onClick: sendQuery,
      src: runIcon,
      alt: 'Run',
      title: translation('MainPage.sendQuery'),
      width: 35,
    },
    {
      onClick: toggleDocs,
      src: docsIcon,
      alt: 'Docs',
      title: translation('MainPage.documentation'),
      width: 26,
    },
    {
      onClick: setPrettifiedQuery,
      src: prettifyIcon,
      alt: 'Prettify',
      title: translation('MainPage.prettifyQuery'),
      width: 30,
    },
    {
      onClick: () => copyToClipboard(query, translation),
      src: copyIcon,
      alt: 'Copy',
      title: translation('MainPage.copyQuery'),
      width: 26,
    },
  ];

  return (
    <ul
      className={cls(
        styles.actions,
        isDarkTheme ? styles.actionsDark : styles.actionsLight
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
