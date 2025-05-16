'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { FC } from 'react';
import useEditTableDialog from './EditTableDialog.hook';
import { Table } from 'basics/types/schema.types';

type Props = {
  open: boolean;
  onClose: () => void;
  table: Table;
  onUpdate: () => void;
};

const EditTableDialog: FC<Props> = ({ open, onClose, table, onUpdate }) => {
  const { number, handleChange, handleSubmit } = useEditTableDialog(table, onUpdate, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Редагувати стіл</DialogTitle>
      <DialogContent>
        <TextField
          label="Номер"
          type="number"
          fullWidth
          margin="normal"
          value={ number }
          onChange={ (e) => handleChange(Number(e.target.value)) }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ handleSubmit } variant="contained">Зберегти</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTableDialog;
