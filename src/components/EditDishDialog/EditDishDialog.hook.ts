import { useState } from 'react';
import { Dish } from 'basics/types/schema.types';
import { updateDish } from 'lib/api/dishes';

const useEditDishDialog = (dish: Dish, onUpdate: Function, onClose: Function) => {
  const [title, setTitle] = useState(dish.title);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(dish.price);
  const [weight, setWeight] = useState(dish.weight);
  const [picture, setPicture] = useState(dish.picture);
  const [isHidden, setIsHidden] = useState(dish.isHidden);
  const [menuId, setMenuId] = useState(dish.menu_id);

  const handleChangeTitle = (value: string) => setTitle(value);
  const handleChangeDescription = (value: string) => setDescription(value);
  const handleChangePrice = (value: number) => setPrice(value);
  const handleChangeWeight = (value: number) => setWeight(value);
  const handleChangePicture = (value: string) => setPicture(value);
  const handleToggleHidden = () => setIsHidden((prev: boolean) => !prev);
  const handleChangeMenuId = (id: string) => setMenuId(id);

  const handleUpdate = async () => {
    if (!menuId) return;

    await updateDish(dish.id, {
      title,
      description,
      price,
      weight,
      picture,
      isHidden,
      menu_id: menuId,
    });

    onUpdate();
    onClose();
  };

  return {
    title,
    description,
    price,
    weight,
    picture,
    isHidden,
    menuId,
    handleUpdate,
    handleChangeTitle,
    handleChangeDescription,
    handleChangePrice,
    handleChangeWeight,
    handleChangePicture,
    handleToggleHidden,
    handleChangeMenuId,
  };
};

export default useEditDishDialog;
