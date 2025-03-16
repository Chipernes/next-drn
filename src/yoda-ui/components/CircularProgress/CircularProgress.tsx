import MuiCircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { FC } from 'react';

const CircularProgress: FC<CircularProgressProps> = (props) => (
  <MuiCircularProgress { ...props } />
);

export default CircularProgress;
