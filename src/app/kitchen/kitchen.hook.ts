'use client';

import { useCallback, useEffect, useState } from 'react';
import { StatusDish } from 'basics/enums/schema.enums';
import { OrderDish } from 'basics/types/schema.types';
import { getOrderDishes } from 'lib/api/orderDishes';

const useKitchen = () => {
  const [orderDishes, setOrderDishes] = useState<OrderDish[]>([]);

  const handleUpdate = useCallback(async () => {
    const allOrderDishes = await getOrderDishes();
    const filtered = allOrderDishes
      .filter((dish) => dish.status === StatusDish.NEW || dish.status === StatusDish.COOKING)
      .sort(
        (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
      );
    setOrderDishes(filtered);
  }, []);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  return { orderDishes, handleUpdate };
};

export default useKitchen;
