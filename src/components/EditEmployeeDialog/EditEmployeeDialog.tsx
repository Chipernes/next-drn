'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
} from '@mui/material';
import { FC } from 'react';
import useEditEmployeeDialog from './EditEmployeeDialog.hook';
import { EditEmployeeDialogPropsType } from './EditEmployeeDialog.types';
import { Role } from 'basics/enums/schema.enums';

const EditEmployeeDialog: FC<EditEmployeeDialogPropsType> = ({ open, onClose, employee, onUpdate }) => {
  const {
    firstName, lastName, role,
    handleUpdate,
    handleChangeFirstName, handleChangeLastName, handleChangeRole,
  } = useEditEmployeeDialog(employee, onUpdate, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Редагувати співробітника</DialogTitle>
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
        <Button variant="contained" onClick={ handleUpdate }>Зберегти</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
