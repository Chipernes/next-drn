import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { FC } from 'react';

const ListItemText: FC<ListItemTextProps> = (props) => (
  <MuiListItemText { ...props } />
);

export default ListItemText;
