'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { FC } from 'react';
import useAddMenuDialog from './AddMenuDialog.hook';
import { AddMenuDialogPropsTypes } from './AddMenuDialog.types';

const AddMenuDialog: FC<AddMenuDialogPropsTypes> = ({ open, onClose, onAdd }) => {
  const {
    title,
    type,
    handleAdd,
    handleChangeTitle,
    handleChangeType,
  } = useAddMenuDialog(onAdd, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Додати меню</DialogTitle>
      <DialogContent>
        <TextField label="Назва" fullWidth margin="normal" value={ title } onChange={ (e) => handleChangeTitle(e.target.value) } />
        <TextField label="Тип" fullWidth margin="normal" value={ type } onChange={ (e) => handleChangeType(e.target.value) } />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ handleAdd } variant="contained">Додати</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuDialog;
