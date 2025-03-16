import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { MouseEventHandler, ReactNode } from 'react';

export type ContentCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
