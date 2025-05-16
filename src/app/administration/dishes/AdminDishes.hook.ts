'use client';

import { useCallback, useEffect, useState } from 'react';
import { Dish, Menu } from 'basics/types/schema.types';
import { getDishes } from 'lib/api/dishes';
import { getMenus } from 'lib/api/menus';

const useAdminDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleReload = useCallback(async () => {
    const allDishes = await getDishes();
    setDishes(allDishes);
    const allMenus = await getMenus();
    setMenus(allMenus);
  }, []);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  return {
    dishes,
    menus,
    handleReload,
    openAddDialog,
    setOpenAddDialog,
  };
};

export default useAdminDishes;
