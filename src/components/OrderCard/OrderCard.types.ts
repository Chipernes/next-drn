import { Order } from 'basics/types/schema.types';

export type OrderCardPropsType = {
  order: Order;
  onOrderUpdate: Function;
  selectedTableNumber: number;
};
