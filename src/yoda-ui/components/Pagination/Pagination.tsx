import { Pagination as MuiPagination, PaginationProps } from '@mui/material';
import { FC } from 'react';

const Pagination: FC<PaginationProps> = (props) => (
  <MuiPagination { ...props } />
);

export default Pagination;
