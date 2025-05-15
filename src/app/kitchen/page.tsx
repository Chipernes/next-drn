'use client';

import { Container, Typography } from '@mui/material';
import useKitchen from './kitchen.hook';
import KitchenOrderDishCard from 'components/KitchenOrderDishCard/KitchenOrderDishCard';

export default function KitchenPage() {
  const { orderDishes, handleUpdate } = useKitchen();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography variant="h4" gutterBottom>
        Страви на кухні
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {
          orderDishes.map((orderDish) => (
            <KitchenOrderDishCard
              key={ orderDish.id }
              orderDish={ orderDish }
              onUpdate={ handleUpdate }
            />
          ))
        }
      </div>
    </Container>
  );
}
