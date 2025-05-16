'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { FC } from 'react';
import useEditMenuDialog from './EditMenuDialog.hook';
import { EditMenuDialogPropsType } from './EditMenuDialog.types';

const EditMenuDialog: FC<EditMenuDialogPropsType> = ({ open, onClose, menu, onUpdate }) => {
  const {
    title,
    type,
    handleUpdate,
    handleChangeTitle,
    handleChangeType,
  } = useEditMenuDialog(menu, onUpdate, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Редагувати меню</DialogTitle>
      <DialogContent>
        <TextField label="Назва" fullWidth margin="normal" value={ title } onChange={ (e) => handleChangeTitle(e.target.value) } />
        <TextField label="Тип" fullWidth margin="normal" value={ type } onChange={ (e) => handleChangeType(e.target.value) } />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ handleUpdate } variant="contained">Зберегти</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMenuDialog;
