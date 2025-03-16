import MuiTableRow, { TableRowProps } from '@mui/material/TableRow';
import { FC } from 'react';

const TableRow: FC<TableRowProps> = (props) => (
  <MuiTableRow { ...props } />
);

export default TableRow;
