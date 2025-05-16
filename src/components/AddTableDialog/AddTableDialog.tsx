'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { FC } from 'react';
import useAddTableDialog from './AddTableDialog.hook';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
};

const AddTableDialog: FC<Props> = ({ open, onClose, onCreate }) => {
  const { number, handleChange, handleSubmit } = useAddTableDialog(onCreate, onClose);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Новий стіл</DialogTitle>
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
        <Button onClick={ handleSubmit } variant="contained">Створити</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTableDialog;
