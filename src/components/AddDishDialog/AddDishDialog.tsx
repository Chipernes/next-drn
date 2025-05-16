'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel, FormControl, InputLabel,
} from '@mui/material';
import { FC } from 'react';
import useAddDishDialog from './AddDishDialog.hook';
import { AddDishDialogPropsTypes } from './AddDishDialog.types';
import Select from 'yoda-ui/components/Form/Select';
import MenuItem from 'yoda-ui/components/MenuItem';

const AddDishDialog: FC<AddDishDialogPropsTypes> = ({ open, onClose, onAdd, menus }) => {
  const {
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
  } = useAddDishDialog(onAdd, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Додати страву</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="menu-select-label">Меню</InputLabel>
          <Select
            labelId="menu-select-label"
            value={ menuId }
            label="Меню"
            onChange={ (e) => handleChangeMenuId(e.target.value as string) }
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
          fullWidth
          margin="normal"
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
          control={
            <Checkbox
              checked={ isHidden }
              onChange={ handleToggleHidden }
            />
          }
          label="Приховати страву"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ handleAdd } variant="contained">Додати</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDishDialog;
