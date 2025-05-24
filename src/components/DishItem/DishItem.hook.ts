'use client';

import { useEffect, useState } from 'react';
import { Dish, Menu } from 'basics/types/schema.types';
import { getDishes } from 'lib/api/dishes';
import { getMenus } from 'lib/api/menus';

type DishWithMenu = Dish & { menu: Menu };

const useDishItem = () => {
  const [dishes, setDishes] = useState<DishWithMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [dishesRaw, menus] = await Promise.all([getDishes(), getMenus()]);

      const dishesWithMenu = dishesRaw.map((dish) => {
        const menu = menus.find((m) => m.id === dish.menu_id);
        return { ...dish, menu: menu! }; // ! бо точно має бути меню
      });

      setDishes(dishesWithMenu);
    };

    fetchData();
  }, []);

  return {
    dishes,
  };
};

export default useDishItem;
