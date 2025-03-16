import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { FC } from 'react';

export type MenuProps = MuiMenuProps;

const Menu: FC<MenuProps> = ({ open, ...props }) => (
  <MuiMenu open={ open } { ...props } />
);

export default Menu;
