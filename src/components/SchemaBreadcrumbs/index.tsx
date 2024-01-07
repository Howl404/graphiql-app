import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs, Button } from '@mui/material';

import { SchemaStackItem } from 'src/types';

import { TranslationKeys } from 'hooks/useTranslation.ts';

import style from './style.module.scss';

type Props = {
  items: SchemaStackItem[];
  handleClick: (i: number) => void;
  translation: (key: TranslationKeys) => string;
};

const btnStyle = {
  textTransform: 'none',
  minWidth: 'fit-content',
  padding: 0,
  '&:disabled': {
    color: 'var(--accent)',
  },
};

export default function SchemaBreadcrumbs({
  items,
  handleClick,
  translation,
}: Props) {
  return (
    <Breadcrumbs
      sx={{ margin: '12px 0' }}
      aria-label="breadcrumb"
      classes={{
        separator: style.separator,
      }}
      separator={<ChevronRight fontSize="small" />}
    >
      <Button
        sx={btnStyle}
        variant="text"
        size="small"
        onClick={() => handleClick(0)}
        disabled={!items.length}
      >
        {translation('MainPage.root')}
      </Button>
      {items.map(({ type, name }, i) => (
        <Button
          sx={btnStyle}
          variant="text"
          key={type}
          onClick={() => handleClick(i + 1)}
          disabled={i + 1 === items.length}
        >
          {name ?? type}{' '}
        </Button>
      ))}
    </Breadcrumbs>
  );
}
