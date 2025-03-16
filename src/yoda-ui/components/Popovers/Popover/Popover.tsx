import MuiPopover, { PopoverProps } from '@mui/material/Popover';
import { FC } from 'react';

const Popover: FC<PopoverProps> = (props) => (
  <MuiPopover { ...props } />
);

export default Popover;
