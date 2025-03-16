import MuiListItem, { ListItemProps } from '@mui/material/ListItem';
import { FC } from 'react';

const ListItem: FC<ListItemProps> = (props) => (
  <MuiListItem { ...props } />
);

export default ListItem;
