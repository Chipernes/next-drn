import { useState } from 'react';
import { updateMenu } from '../../lib/api/menus';
import { Menu } from 'basics/types/schema.types';

const useEditMenuDialog = (menu: Menu, onUpdate: Function, onClose: Function) => {
  const [title, setTitle] = useState(menu.title);
  const [type, setType] = useState(menu.type);

  const handleUpdate = async () => {
    await updateMenu(menu.id, { title, type });
    onUpdate();
    onClose();
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeType = (value: string) => {
    setType(value);
  };

  return {
    title,
    type,
    handleUpdate,
    handleChangeTitle,
    handleChangeType,
  };
};

export default useEditMenuDialog;
