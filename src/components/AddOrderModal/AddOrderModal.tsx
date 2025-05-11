'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material';
import useAddOrderModal from './AddOrderModal.hook';

export const AddOrderModal = ({ open, onClose, updateOrders }: { open: boolean; onClose: () => void; updateOrders: () => void }) => {
  const {
    selectedTable,
    handleSelectedTable,
    tables,
    selectedWaiter,
    handleSelectedWaiter,
    waiters,
    handleCreateOrder,
  } = useAddOrderModal(onClose, updateOrders);

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Нове замовлення</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label='Стіл'
          value={ selectedTable }
          onChange={ (e) => handleSelectedTable(e.target.value) }
          sx={ { mt: 2 } }
        >
          {
            tables.map((table) => (
              <MenuItem key={ table.id } value={ table.id }>
              Стіл №{ table.number }
              </MenuItem>
            ))
          }
        </TextField>

        <TextField
          select
          fullWidth
          label='Офіціант'
          value={ selectedWaiter }
          onChange={ (e) => handleSelectedWaiter(e.target.value) }
          sx={ { mt: 2 } }
        >
          {
            waiters.map((waiter) => (
              <MenuItem key={ waiter.id } value={ waiter.id }>
                { waiter.first_name } { waiter.last_name }
              </MenuItem>
            ))
          }
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Скасувати</Button>
        <Button onClick={ () => handleCreateOrder(selectedTable, selectedWaiter) } variant='contained'>Створити</Button>
      </DialogActions>
    </Dialog>
  );
};
