import MuiTableBody, { TableBodyProps } from '@mui/material/TableBody';
import { FC } from 'react';

const TableBody: FC<TableBodyProps> = (props) => (
  <MuiTableBody { ...props } />
);

export default TableBody;
