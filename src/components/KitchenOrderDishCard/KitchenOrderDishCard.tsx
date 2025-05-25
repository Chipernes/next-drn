'use client';

import {
  Cancel,
  FiberNew,
  LocalDining,
  SoupKitchen,
  TaskAlt,
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { FC } from 'react';
import useKitchenOrderDishCard from './KitchenOrderDishCard.hook';
import { KitchenOrderDishCardPropsType } from './KitchenOrderDishCard.types';
import Loader from 'yoda-ui/components/Loader';

const statusIcon = {
  NEW: <FiberNew color="info" />,
  COOKING: <SoupKitchen color="warning" />,
  DONE: <TaskAlt color="success" />,
  SERVED: <LocalDining color="success" />,
  CANCELLED: <Cancel color="error" />,
};

const KitchenOrderDishCard: FC<KitchenOrderDishCardPropsType> = ({ orderDish, onUpdate }) => {
  const {
    dish,
    selectedChef,
    allChefs,
    handleAssignChef,
    handleMarkDone,
  } = useKitchenOrderDishCard(orderDish, onUpdate);

  return (
    <Card sx={ { mb: 2 } }>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          { statusIcon[orderDish.status] } Страва: { dish?.title || <Loader center/> }
        </Typography>
        <Typography variant="body1">
          Статус: { orderDish.status }
        </Typography>
        <Typography variant="body1" gutterBottom>
          Кухар: { selectedChef ? `${selectedChef.first_name} ${selectedChef.last_name}` : 'Не призначено' }
        </Typography>

        <FormControl fullWidth sx={ { mt: 2 } }>
          <InputLabel id={ `cook-select-${orderDish.id}` }>Вибрати кухаря</InputLabel>
          <Select
            labelId={ `cook-select-${orderDish.id}` }
            value={ orderDish.chef_id || '' }
            label="Вибрати кухаря"
            onChange={ (e) => handleAssignChef(e.target.value) }
          >
            {
              allChefs.map((chef) => (
                <MenuItem key={ chef.id } value={ chef.id }>
                  { chef.first_name } { chef.last_name }
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        {
          orderDish.status === 'COOKING' && (
            <Stack direction="row" spacing={ 2 } sx={ { mt: 2 } }>
              <Button
                variant="contained"
                color="success"
                onClick={ handleMarkDone }
              >
              Позначити як готово
              </Button>
            </Stack>
          )
        }
      </CardContent>
    </Card>
  );
};

export default KitchenOrderDishCard;
