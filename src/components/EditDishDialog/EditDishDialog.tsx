'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import { FC } from 'react';
import useEditDishDialog from './EditDishDialog.hook';
import { EditDishDialogPropsType } from './EditDishDialog.types';

const EditDishDialog: FC<EditDishDialogPropsType> = ({ open, onClose, dish, onUpdate, menus }) => {
  const {
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
  } = useEditDishDialog(dish, onUpdate, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Редагувати страву</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="menu-select-label">Меню</InputLabel>
          <Select
            labelId="menu-select-label"
            value={ menuId }
            label="Меню"
            onChange={ (e) => handleChangeMenuId(e.target.value) }
          >
            {
              menus.map((menu) => (
                <MenuItem key={ menu.id } value={ menu.id }>
                  { menu.title }
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TextField
          label="Назва"
          fullWidth
          margin="normal"
          value={ title }
          onChange={ (e) => handleChangeTitle(e.target.value) }
        />
        <TextField
          label="Опис"
          fullWidth
          margin="normal"
          value={ description }
          onChange={ (e) => handleChangeDescription(e.target.value) }
        />
        <TextField
          label="Ціна"
          type="number"
          fullWidth margin="normal"
          value={ price }
          onChange={ (e) => handleChangePrice(Number(e.target.value)) }
        />
        <TextField
          label="Вага (г)"
          type="number"
          fullWidth
          margin="normal"
          value={ weight }
          onChange={ (e) => handleChangeWeight(Number(e.target.value)) }
        />
        <TextField
          label="URL зображення"
          fullWidth
          margin="normal"
          value={ picture }
          onChange={ (e) => handleChangePicture(e.target.value) }
        />
        <FormControlLabel
          control={ <Checkbox checked={ isHidden } onChange={ handleToggleHidden } /> }
          label="Приховати страву"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ handleUpdate } variant="contained" disabled={ !menuId }>Зберегти</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDishDialog;
