import {
  ArrowBack,
  ArrowForward,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import AbcIcon from '@mui/icons-material/Abc';
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useContext, useState } from 'react';

import { SchemaArg, SchemaField, SchemaStackItem, SchemaType } from 'src/types';

import { AppThemeContext } from 'context/ThemeContext';

import style from './style.module.scss';

type Props = {
  title: string;
  data: SchemaField[] | SchemaArg[];
  handleFieldClick: (params: SchemaStackItem) => void;
  disableSort?: boolean;
};

export default function SchemaItemsList({
  title,
  data,
  handleFieldClick,
  disableSort,
}: Props) {
  const [open, setOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const { isDarkTheme } = useContext(AppThemeContext);

  if (!disableSort)
    data.sort((a, b) =>
      sortOrder === 'az'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleChangeSort = () => {
    setSortOrder(sortOrder === 'az' ? 'za' : 'az');
  };

  const extractTypeName = ({
    name: type,
    kind,
    ofType,
  }: SchemaType): SchemaStackItem => {
    const typeDescription: SchemaStackItem = {
      type,
      text: type,
    };

    if (!type && ofType) {
      const nested = extractTypeName(ofType);
      if (kind === 'LIST') nested.text = `[${nested.text}]`;
      if (kind === 'NON_NULL') nested.text = `${nested.text}!`;
      return nested;
    }
    return typeDescription;
  };

  return (
    <>
      <ListSubheader
        sx={{
          backgroundColor: isDarkTheme
            ? 'var(--header)'
            : 'var(--header-light)',
          position: 'static',
        }}
        disableGutters
        component="div"
      >
        <ListItemButton
          onClick={() => setOpen(!open)}
          classes={{ root: style.subHeader }}
        >
          <span className={style.listTitle}>{title}</span>
          <ListItemIcon classes={{ root: style.collapseIcon }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
      </ListSubheader>
      <Collapse in={open}>
        {!disableSort && data.length > 1 && (
          <IconButton onClick={handleChangeSort} data-testid="sort-btn">
            <AbcIcon fontSize="large" color="primary" />
            {sortOrder === 'az' ? (
              <ArrowForward fontSize="small" color="primary" />
            ) : (
              <ArrowBack fontSize="small" color="primary" />
            )}
          </IconButton>
        )}
        <List dense disablePadding>
          {data.map((item) => {
            const { name } = item;

            const type = extractTypeName(item.type);

            return (
              <ListItem disablePadding key={name}>
                <ListItemButton
                  onClick={() =>
                    handleFieldClick({
                      type: type.type ?? '',
                      name,
                      args: ('args' in item && item.args) || [],
                      text: type.text,
                    })
                  }
                >
                  <ListItemText>
                    <span className={style.listItem}>
                      {name}:{' '}
                      <span className={style.listItemType}>{type.text}</span>
                    </span>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
