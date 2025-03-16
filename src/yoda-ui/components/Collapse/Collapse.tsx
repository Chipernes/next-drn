import MuiCollapse, { CollapseProps } from '@mui/material/Collapse';
import { FC } from 'react';

const Collapse: FC<CollapseProps> = (props) => (
  <MuiCollapse { ...props } />
);

export default Collapse;
