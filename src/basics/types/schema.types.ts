import { Role, StatusDish, StatusOrder } from '../enums/schema.enums';

export type User = {
  id: string;
  login: string;
  password: string;
  role: Role;
};

export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  picture?: string;
  role: Role;
};

export type Menu = {
  id: string;
  title: string;
  type: string;
  createdAt: Date; // ISO date string
};

export type Dish = {
  id: string;
  menu_id: string;
  title: string;
  description: string;
  price: number;
  weight: number;
  picture: string;
  isHidden: boolean;
  createdAt: Date; // ISO date string
};

export type Table = {
  id: string;
  number: number;
};

export type Order = {
  id: string;
  table_id: string;
  waiter_id?: string;
  status: StatusOrder;
  createdAt: Date; // ISO date string
};

export type OrderDish = {
  id: string;
  order_id: string;
  dish_id: string;
  chef_id?: string;
  status: StatusDish;
  start_time: Date; // ISO date string
  end_time?: Date; // ISO date string
};
