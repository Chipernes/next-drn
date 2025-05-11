'use client';

import { Button, Container } from '@mui/material';
import useService from './service.hook';
import { AddOrderModal } from 'components/AddOrderModal/AddOrderModal';
import OrderCard from 'components/OrderCard/OrderCard';

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
      <Button variant='contained' onClick={ () => handleModalOpen(true) }>
        Додати замовлення
      </Button>
      <AddOrderModal open={ modalOpen } onClose={ () => handleModalOpen(false) } updateOrders={ updateOrders } />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
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
      </div>
    </Container>
  );
}
