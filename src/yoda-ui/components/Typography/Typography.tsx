import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { FC } from 'react';

export type TypographyProps = MuiTypographyProps;

const Typography: FC<TypographyProps> = (props) => (
  <MuiTypography { ...props } />
);

export default Typography;
