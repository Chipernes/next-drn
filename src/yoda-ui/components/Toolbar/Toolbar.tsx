import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';
import { FC } from 'react';

const Toolbar: FC<ToolbarProps> = (props) => (
  <MuiToolbar disableGutters { ...props } />
);

export default Toolbar;
