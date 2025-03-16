import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import { FC } from 'react';

const Card: FC<MuiCardProps> = (props) => (
  <MuiCard { ...props } />
);

export default Card;
