import { Menu } from 'basics/types/schema.types';

export type EditMenuDialogPropsType = {
  open: boolean;
  onClose: () => void;
  menu: Menu;
  onUpdate: Function;
};
