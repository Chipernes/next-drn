import MuiTableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import { FC } from 'react';

const TableContainer: FC<TableContainerProps> = (props) => (
  <MuiTableContainer { ...props } />
);

export default TableContainer;
