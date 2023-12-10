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

import { SchemaField, TypeName } from 'src/types';

type Props = {
  title: string;
  data: SchemaField[];
  handleFieldClick: (params: TypeName) => void;
};

export default function SchemaItemsList({
  title,
  data,
  handleFieldClick,
}: Props) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ListSubheader disableGutters component="div">
        <ListItemButton onClick={() => setOpen(!open)}>
          <b>{title}</b>
          <ListItemIcon>{open ? <ExpandMore /> : <ExpandLess />}</ListItemIcon>
        </ListItemButton>
      </ListSubheader>
      <Collapse in={open}>
        <List dense disablePadding>
          {data.map(({ name, type }) => {
            const properType = {
              typeName: type.name,
              text: type.name,
            };
            if (!type.name && type.ofType?.name) {
              properType.typeName = type.ofType.name;
              properType.text = `[${type.ofType.name}]`;
            }

            return (
              <ListItem disablePadding key={name}>
                <ListItemButton
                  onClick={() =>
                    handleFieldClick({ type: properType.typeName ?? '', name })
                  }
                >
                  <ListItemText>
                    {name}: {properType.text}
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
