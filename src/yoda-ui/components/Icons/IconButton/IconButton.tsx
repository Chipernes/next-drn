import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import { FC, forwardRef } from 'react';

const IconButton: FC<IconButtonProps> = forwardRef((props, ref) => (
  <MuiIconButton { ...props } ref={ ref } />
));

IconButton.displayName = 'IconButton';

export default IconButton;
