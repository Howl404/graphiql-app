import useTranslation from 'hooks/useTranslation.ts';

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

  const icons = [
    {
      onClick: sendQuery,
      src: runIcon,
      alt: 'Run',
      title: translation('GraphQLPage.sendQuery'),
      width: 35,
    },
    {
      onClick: toggleDocs,
      src: docsIcon,
      alt: 'Docs',
      title: translation('GraphQLPage.documentation'),
      width: 26,
    },
    {
      onClick: setPrettifiedQuery,
      src: prettifyIcon,
      alt: 'Prettify',
      title: translation('GraphQLPage.prettifyQuery'),
      width: 30,
    },
    {
      onClick: () => copyToClipboard(query),
      src: copyIcon,
      alt: 'Copy',
      title: translation('GraphQLPage.copyQuery'),
      width: 26,
    },
  ];

  return (
    <ul className={styles.actions} data-testid="actions-panel">
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
