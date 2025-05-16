import { useState } from 'react';
import { Dish } from 'basics/types/schema.types';
import { deleteDish } from 'lib/api/dishes';

const useDishCard = (dish: Dish, onChange: Function) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModal = (value: boolean) => setOpenEdit(value);

  const handleDelete = async () => {
    await deleteDish(dish.id);
    onChange();
  };

  return {
    openEdit,
    handleOpenModal,
    handleDelete,
  };
};

export default useDishCard;
