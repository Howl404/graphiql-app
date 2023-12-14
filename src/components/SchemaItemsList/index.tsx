import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useState } from 'react';

import { SchemaArg, SchemaField, SchemaStackItem, SchemaType } from 'src/types';

import style from './style.module.scss';

type Props = {
  title: string;
  data: SchemaField[] | SchemaArg[];
  handleFieldClick: (params: SchemaStackItem) => void;
};

export default function SchemaItemsList({
  title,
  data,
  handleFieldClick,
}: Props) {
  const [open, setOpen] = useState(true);

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
      <ListSubheader disableGutters component="div">
        <ListItemButton onClick={() => setOpen(!open)}>
          <span className={style.listTitle}>{title}</span>
          <ListItemIcon>{open ? <ExpandMore /> : <ExpandLess />}</ListItemIcon>
        </ListItemButton>
      </ListSubheader>
      <Collapse in={open}>
        <List dense disablePadding>
          {data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
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
                      {name}: {type.text}
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
