'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
} from '@mui/material';
import { FC } from 'react';
import useAddEmployeeDialog from './AddEmployeeDialog.hook';
import { AddEmployeeDialogPropsType } from './AddEmployeeDialog.types';
import { Role } from 'basics/enums/schema.enums';

const AddEmployeeDialog: FC<AddEmployeeDialogPropsType> = ({ open, onClose, onAdd }) => {
  const {
    firstName, lastName, role,
    handleAdd,
    handleChangeFirstName, handleChangeLastName, handleChangeRole,
  } = useAddEmployeeDialog(onAdd, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Додати співробітника</DialogTitle>
      <DialogContent>
        <TextField
          label="Ім'я"
          fullWidth
          margin="normal"
          value={ firstName }
          onChange={ (e) => handleChangeFirstName(e.target.value) }
        />
        <TextField
          label="Прізвище"
          fullWidth
          margin="normal"
          value={ lastName }
          onChange={ (e) => handleChangeLastName(e.target.value) }
        />
        <TextField
          label="Роль"
          fullWidth
          select
          margin="normal"
          value={ role }
          onChange={ (e) => handleChangeRole(e.target.value as Role) }
        >
          <MenuItem value="SERVICE">Офіціант</MenuItem>
          <MenuItem value="KITCHEN">Кухар</MenuItem>
          <MenuItem value="ADMINISTRATION">Адміністратор</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button variant="contained" onClick={ handleAdd }>Додати</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
