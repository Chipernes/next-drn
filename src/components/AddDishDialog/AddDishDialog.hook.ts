import { useState } from 'react';
import { createDish } from 'lib/api/dishes';

const useAddDishDialog = (onAdd: Function, onClose: Function) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [picture, setPicture] = useState('');
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>('');

  const handleChangeTitle = (value: string) => setTitle(value);
  const handleChangeDescription = (value: string) => setDescription(value);
  const handleChangePrice = (value: number) => setPrice(value);
  const handleChangeWeight = (value: number) => setWeight(value);
  const handleChangePicture = (value: string) => setPicture(value);
  const handleToggleHidden = () => setIsHidden((prev) => !prev);
  const handleChangeMenuId = (id: string) => setMenuId(id);

  const handleAdd = async () => {
    if (!menuId) return;

    await createDish({
      menu_id: menuId,
      title,
      description,
      price,
      weight,
      picture,
      isHidden,
    });

    onAdd();
    onClose();

    setTitle('');
    setDescription('');
    setPrice(0);
    setWeight(0);
    setPicture('');
    setIsHidden(false);
    setMenuId('');
  };

  return {
    title,
    description,
    price,
    weight,
    picture,
    isHidden,
    menuId,
    handleAdd,
    handleChangeTitle,
    handleChangeDescription,
    handleChangePrice,
    handleChangeWeight,
    handleChangePicture,
    handleToggleHidden,
    handleChangeMenuId,
  };
};

export default useAddDishDialog;
