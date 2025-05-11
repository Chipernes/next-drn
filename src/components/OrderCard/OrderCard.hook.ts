'use client';

import { useEffect, useState } from 'react';
import { Dish, Employee, Order, OrderDish } from 'basics/types/schema.types';
import { getDishes } from 'lib/api/dishes';
import { getEmployees } from 'lib/api/employees';
import { createOrderDish, deleteOrderDish, getOrderDishes, updateOrderDish } from 'lib/api/orderDishes';
import { deleteOrder, updateOrder } from 'lib/api/orders';

const useOrderCard = (order: Order, onOrderUpdate: Function) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [orderDishes, setOrderDishes] = useState<OrderDish[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState('');
  const selectedWaiter = employees.find((employee) => employee.id === order.waiter_id);

  const handleOpenManageModal = (type: boolean) => {
    setOpen(type);
  };

  const handleUpdateOrderDishStatus = async (orderDishId: string, updatedStatus: string) => {
    await updateOrderDish(orderDishId, { status: updatedStatus });
    getOrderDishes().then(setOrderDishes);
  };

  const handleDeleteOrderDish = async (orderDishId: string) => {
    await deleteOrderDish(orderDishId);
    getOrderDishes().then(setOrderDishes);
  };

  const handleDishInput = async (dish: string) => {
    setSelectedDishId(dish);
  };

  const handleUpdateOrderStatus = async (orderId: string, updatedStatus: string) => {
    await updateOrder(orderId, { status: updatedStatus });
    onOrderUpdate();
  };

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    onOrderUpdate();
  };

  const handleAddDish = async (orderId: string, dishId: string) => {
    await createOrderDish({
      orderId,
      dishId,
    });
    getOrderDishes().then(setOrderDishes);
  };

  useEffect(() => {
    getDishes().then(setDishes);
    getEmployees().then(setEmployees);
    getOrderDishes().then(setOrderDishes);
  }, []);

  return {
    selectedWaiter,
    dishes,
    orderDishes,
    open,
    handleOpenManageModal,
    handleUpdateOrderDishStatus,
    handleDeleteOrderDish,
    handleDishInput,
    selectedDishId,
    handleUpdateOrderStatus,
    handleDeleteOrder,
    handleAddDish,
  };
};

export default useOrderCard;
