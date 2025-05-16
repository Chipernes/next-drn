import { Menu } from 'basics/types/schema.types';

export type AddDishDialogPropsTypes = {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  menus: Menu[];
};
