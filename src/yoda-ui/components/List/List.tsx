import MuiList, { ListProps } from '@mui/material/List';
import { FC } from 'react';

const List: FC<ListProps> = (props) => (
  <MuiList { ...props } />
);

export default List;
