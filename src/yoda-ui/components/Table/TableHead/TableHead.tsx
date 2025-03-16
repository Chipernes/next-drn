import MuiTableHead, { TableHeadProps } from '@mui/material/TableHead';
import { FC } from 'react';

const TableHead: FC<TableHeadProps> = (props) => (
  <MuiTableHead { ...props } />
);

export default TableHead;
