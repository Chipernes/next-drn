'use client';

import { Button, Container, Typography } from '@mui/material';
import useService from './service.hook';
import { AddOrderModal } from 'components/AddOrderModal/AddOrderModal';
import OrderCard from 'components/OrderCard/OrderCard';
import Box from 'yoda-ui/components/Box';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

export default function Page() {
  const {
    modalOpen,
    handleModalOpen,
    updateOrders,
    sortedOrders,
    getAssociatedTable,
  } = useService();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Список замовлень
      </Typography>
      <Box className="flex justify-center mb-4">
        <Button variant='contained' onClick={ () => handleModalOpen(true) }>
          Додати замовлення
        </Button>
      </Box>
      <AddOrderModal open={ modalOpen } onClose={ () => handleModalOpen(false) } updateOrders={ updateOrders } />

      {
        !sortedOrders.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {
              sortedOrders.map((order) => (
                <OrderCard
                  key={ order.id }
                  order={ order }
                  onOrderUpdate={ updateOrders }
                  selectedTableNumber={ getAssociatedTable(order.table_id) }
                />
              ))
            }
          </Box>
      }

    </Container>
  );
}
