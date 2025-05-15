import { useState } from 'react';
import { createMenu } from 'lib/api/menus';

const useAddMenuDialog = (onAdd: Function, onClose: Function) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeType = (value: string) => {
    setType(value);
  };

  const handleAdd = async () => {
    await createMenu({ title, type });
    onAdd();
    onClose();
    setTitle('');
    setType('');
  };

  return {
    title,
    type,
    handleAdd,
    handleChangeTitle,
    handleChangeType,
  };
};

export default useAddMenuDialog;
