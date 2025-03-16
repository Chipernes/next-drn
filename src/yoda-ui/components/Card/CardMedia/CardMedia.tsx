import MuiCardMedia, { CardMediaProps as MuiCardMediaProps } from '@mui/material/CardMedia';
import { FC } from 'react';

const CardMedia: FC<MuiCardMediaProps> = (props) => (
  <MuiCardMedia { ...props } />
);

export default CardMedia;
