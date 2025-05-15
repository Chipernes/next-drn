'use client';

import { useEffect, useState } from 'react';
import { Role, StatusDish } from 'basics/enums/schema.enums';
import { Dish, Employee, OrderDish } from 'basics/types/schema.types';
import { getDishById } from 'lib/api/dishes';
import { getEmployees } from 'lib/api/employees';
import { updateOrderDish } from 'lib/api/orderDishes';

const useKitchenOrderDishCard = (orderDish: OrderDish, onUpdate: Function) => {
  const [allChefs, setAllChefs] = useState<Employee[]>([]);
  const [dish, setDish] = useState<Dish | null>(null);

  useEffect(() => {
    const getData = async () => {
      const [allEmployees, dishData] = await Promise.all([
        getEmployees(),
        getDishById(orderDish.dish_id),
      ]);
      setAllChefs(allEmployees.filter((emp) => emp.role === Role.KITCHEN));
      setDish(dishData);
    };

    getData();
  }, [orderDish.dish_id]);

  const handleAssignChef = async (chefId: string) => {
    await updateOrderDish(orderDish.id, {
      chef_id: chefId,
      status: StatusDish.COOKING,
    });
    onUpdate();
  };

  const handleMarkDone = async () => {
    await updateOrderDish(orderDish.id, {
      status: StatusDish.DONE,
    });
    onUpdate(); // тригеримо оновлення списку
  };

  const selectedChef = allChefs.find((chef) => chef.id === orderDish.chef_id);

  return {
    dish,
    selectedChef,
    allChefs,
    handleAssignChef,
    handleMarkDone,
  };
};

export default useKitchenOrderDishCard;
