import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import { FC } from 'react';

export type MenuItemProps = MuiMenuItemProps;

const MenuItem: FC<MenuItemProps> = (props) => (
  <MuiMenuItem disableRipple { ...props } />
);

export default MenuItem;
