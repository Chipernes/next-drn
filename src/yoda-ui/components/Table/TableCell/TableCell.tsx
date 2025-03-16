import MuiTableCell, { TableCellProps } from '@mui/material/TableCell';
import { FC } from 'react';

const TableCell: FC<TableCellProps> = (props) => (
  <MuiTableCell { ...props } />
);

export default TableCell;
