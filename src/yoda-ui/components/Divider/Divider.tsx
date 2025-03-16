import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider';
import { FC } from 'react';

const Divider: FC<MuiDividerProps> = (props) => (
  <MuiDivider { ...props } />
);

export default Divider;
