import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs, Button } from '@mui/material';

import { TypeName } from 'src/types';

import style from './style.module.css';

type Props = {
  items: TypeName[];
  handleClick: (i: number) => void;
};

export default function SchemaBreadcrumbs({ items, handleClick }: Props) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      classes={{
        separator: style.separator,
      }}
      separator={<ChevronRight fontSize="small" />}
    >
      <Button
        variant="text"
        size="small"
        onClick={() => handleClick(0)}
        disabled={!items.length}
      >
        Root
      </Button>
      {items.map(({ type, name }, i) => (
        <Button
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
