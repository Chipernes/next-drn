import MuiBox, { BoxProps } from '@mui/material/Box';
import { FC, forwardRef } from 'react';
import { YodaColors } from 'yoda-ui/yodaTheme';

const Box: FC<BoxProps> = forwardRef((props, ref) => (
  <MuiBox color={ YodaColors.gray5 } { ...props } ref={ ref } />
));

Box.displayName = 'Box';

export default Box;
