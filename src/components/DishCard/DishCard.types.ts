import { Dish, Menu } from 'basics/types/schema.types';

export type DishCardPropsType = {
  dish: Dish;
  onChange: () => void;
  menus: Menu[];
};
