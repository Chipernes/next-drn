import MuiListItemSecondaryAction, { ListItemSecondaryActionProps } from '@mui/material/ListItemSecondaryAction';
import { FC } from 'react';

const ListItemSecondaryAction: FC<ListItemSecondaryActionProps> = (props) => (
  <MuiListItemSecondaryAction { ...props } />
);

export default ListItemSecondaryAction;
