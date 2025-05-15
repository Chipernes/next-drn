'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu } from 'basics/types/schema.types';
import { getMenus } from 'lib/api/menus';

const useAdminMenu = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleReload = useCallback(async () => {
    const data = await getMenus();
    setMenus(data);
  }, []);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  return {
    menus,
    handleReload,
    openAddDialog,
    setOpenAddDialog,
  };
};

export default useAdminMenu;
