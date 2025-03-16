import MuiLink, { LinkProps } from '@mui/material/Link';
import { FC } from 'react';

const Link: FC<LinkProps> = (props) => (
  <MuiLink { ...props } />
);

export default Link;
