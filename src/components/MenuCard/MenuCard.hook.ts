import { useState } from 'react';
import { Menu } from 'basics/types/schema.types';
import { deleteMenu } from 'lib/api/menus';

const useMenuCard = (menu: Menu, onChange: Function) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModal = (value: boolean) => {
    setOpenEdit(value);
  };

  const handleDelete = async () => {
    await deleteMenu(menu.id);
    onChange();
  };

  return {
    openEdit,
    handleOpenModal,
    handleDelete,
  };
};

export default useMenuCard;
