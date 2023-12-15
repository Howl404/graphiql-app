import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs, Button } from '@mui/material';

import { SchemaStackItem } from 'src/types';

import style from './style.module.scss';

type Props = {
  items: SchemaStackItem[];
  handleClick: (i: number) => void;
};

export default function SchemaBreadcrumbs({ items, handleClick }: Props) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      classes={{
        root: style.breadcrumbs,
        separator: style.separator,
      }}
      separator={<ChevronRight fontSize="small" />}
    >
      <Button
        variant="text"
        size="small"
        onClick={() => handleClick(0)}
        disabled={!items.length}
        classes={{ root: style.breadcrumbBtn }}
      >
        Root
      </Button>
      {items.map(({ type, name }, i) => (
        <Button
          variant="text"
          key={type}
          onClick={() => handleClick(i + 1)}
          disabled={i + 1 === items.length}
          classes={{ root: style.breadcrumbBtn }}
        >
          {name ?? type}{' '}
        </Button>
      ))}
    </Breadcrumbs>
  );
}
