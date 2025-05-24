'use client';

import { Container, Typography } from '@mui/material';
import useAdminDishes from './AdminDishes.hook';
import AddDishDialog from 'components/AddDishDialog/AddDishDialog';
import DishCard from 'components/DishCard/DishCard';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

export default function AdminDishesPage() {
  const {
    dishes,
    menus,
    handleReload,
    openAddDialog,
    setOpenAddDialog,
  } = useAdminDishes();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Страви
      </Typography>

      <AddDishDialog open={ openAddDialog } onClose={ () => setOpenAddDialog(false) } onAdd={ handleReload } menus={ menus } />

      <Box className="flex justify-center mb-4">
        <Button onClick={ () => setOpenAddDialog(true) } className="px-4 py-2 bg-blue-500 text-white rounded">
          Додати страву
        </Button>
      </Box>

      {
        !dishes.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              dishes.map((dish) => (
                <DishCard key={ dish.id } dish={ dish } onChange={ handleReload } menus={ menus } />
              ))
            }
          </Box>
      }

    </Container>
  );
}
