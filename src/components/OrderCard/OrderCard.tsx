'use client';

import {
  Delete,
  ManageSearch, LocalDining, Cancel, FiberNew, SoupKitchen, TaskAlt, SyncAlt,
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';

import useOrderCard from './OrderCard.hook';
import { OrderCardPropsType } from './OrderCard.types';
import { StatusDish, StatusOrder } from 'basics/enums/schema.enums';
import Loader from 'yoda-ui/components/Loader';

const statusIcon = {
  NEW: <FiberNew color="info" />,
  COOKING: <SoupKitchen color="warning" />,
  DONE: <TaskAlt color="success" />,
  SERVED: <LocalDining color="success" />,
  CANCELLED: <Cancel color="error" />,
};

const orderStatusIcon = {
  NEW: <FiberNew color="info" />,
  PROCESSING: <SyncAlt color="warning" />,
  DONE: <TaskAlt color="success" />,
  CANCELLED: <Cancel color="error" />,
};

export default function OrderCard({ order, onOrderUpdate, selectedTableNumber }: OrderCardPropsType) {
  const {
    selectedWaiter,
    dishes,
    orderDishes,
    open,
    handleOpenManageModal,
    handleUpdateOrderDishStatus,
    handleDeleteOrderDish,
    handleDishInput,
    selectedDishId,
    handleUpdateOrderStatus,
    handleDeleteOrder,
    handleAddDish,
  } = useOrderCard(order, onOrderUpdate);

  if (order.status === StatusOrder.CANCELLED || order.status === StatusOrder.DONE) return null;

  return (
    <Card sx={ { mb: 2 } }>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={ 1 }>
            { orderStatusIcon[order.status] }
            <Typography variant="h6">{ `Стіл №${selectedTableNumber ?? <Loader center/>}` }</Typography>
          </Stack>
        }
        subheader={ `Офіціант: ${selectedWaiter ? `${selectedWaiter.first_name} ${selectedWaiter.last_name}` : <Loader center/>}` }
      />
      <CardContent>
        <Button
          variant="outlined"
          onClick={
            () => {
              handleOpenManageModal(true);
            }
          }
        >
          <ManageSearch sx={ { mr: 1 } } />
          Керувати
        </Button>

        <Dialog open={ open } onClose={ () => handleOpenManageModal(false) } fullWidth maxWidth="sm">
          <DialogTitle>Керування замовленням</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" sx={ { mb: 2 } }>
              Страви:
            </Typography>

            {
              orderDishes.map((orderDish) => {
                const associatedDish = dishes.find((dish) => dish.id === orderDish.dish_id && orderDish.order_id === order.id);
                if (!associatedDish) return null;
                return (
                  <Stack
                    key={ orderDish.id }
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={ { mb: 1 } }
                  >
                    <Stack direction="row" alignItems="center" spacing={ 1 }>
                      { statusIcon[orderDish.status] }
                      <Typography variant="body2">
                        { associatedDish?.title || '—' }
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={ 1 }>
                      {
                        (Object.keys(StatusDish)).map((status) => (
                          <IconButton
                            key={ status }
                            size="small"
                            onClick={ () => handleUpdateOrderDishStatus(orderDish.id, status) }
                            color={ orderDish.status === status ? 'primary' : 'default' }
                          >
                            { statusIcon[status as StatusDish] }
                          </IconButton>
                        ))
                      }
                      <Tooltip title="Видалити">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={ () => handleDeleteOrderDish(orderDish.id) }
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                );
              })
            }

            <FormControl fullWidth sx={ { mt: 3 } }>
              <InputLabel id="dish-select-label">Страва</InputLabel>
              <Select
                labelId="dish-select-label"
                value={ selectedDishId }
                label="Страва"
                onChange={ (e) => handleDishInput(e.target.value) }
              >
                {
                  dishes.map((dish) => (
                    <MenuItem key={ dish.id } value={ dish.id }>
                      { dish.title }
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={ { mt: 4 } }>
              Статус замовлення:
            </Typography>
            <Stack direction="row" spacing={ 1 } sx={ { mt: 1 } }>
              {
                (Object.keys(StatusOrder)).map((status) => (
                  <IconButton
                    key={ status }
                    color={ order.status === status ? 'primary' : 'default' }
                    onClick={ () => handleUpdateOrderStatus(order.id, status) }
                  >
                    { orderStatusIcon[status as StatusOrder] }
                  </IconButton>
                ))
              }
              <Tooltip title="Видалити замовлення">
                <IconButton color="error" onClick={ () => handleDeleteOrder(order.id) }>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => handleOpenManageModal(false) }>Закрити</Button>
            <Button onClick={ () => handleAddDish(order.id, selectedDishId) } variant="contained">
              Додати
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
