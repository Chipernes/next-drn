import MuiCardContent, { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';
import { FC } from 'react';

const CardContent: FC<MuiCardContentProps> = (props) => (
  <MuiCardContent { ...props } />
);

export default CardContent;
