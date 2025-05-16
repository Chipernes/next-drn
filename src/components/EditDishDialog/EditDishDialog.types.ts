import { Dish, Menu } from 'basics/types/schema.types';

export type EditDishDialogPropsType = {
  open: boolean;
  onClose: () => void;
  dish: Dish;
  onUpdate: () => void;
  menus: Menu[];
};
