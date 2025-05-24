'use client';

import { Container, Typography } from '@mui/material';
import useKitchen from './kitchen.hook';
import KitchenOrderDishCard from 'components/KitchenOrderDishCard/KitchenOrderDishCard';
import Box from 'yoda-ui/components/Box';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

export default function KitchenPage() {
  const { orderDishes, handleUpdate } = useKitchen();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Страви на кухні
      </Typography>

      {
        !orderDishes.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {
              !orderDishes.length
                ? <Loader center color={ YodaColors.black }/>
                : orderDishes.map((orderDish) => (
                  <KitchenOrderDishCard
                    key={ orderDish.id }
                    orderDish={ orderDish }
                    onUpdate={ handleUpdate }
                  />
                ))
            }
          </Box>
      }
    </Container>
  );
}
