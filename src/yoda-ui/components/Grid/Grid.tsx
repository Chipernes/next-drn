import MuiGrid, { GridProps } from '@mui/material/Grid';
import { FC } from 'react';

const Grid: FC<GridProps> = (props) => (
  <MuiGrid { ...props } />
);

export default Grid;
