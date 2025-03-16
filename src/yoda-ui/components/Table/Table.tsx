import MuiTable, { TableProps } from '@mui/material/Table';
import { FC } from 'react';

const Table: FC<TableProps> = (props) => (
  <MuiTable { ...props } />
);

export default Table;
