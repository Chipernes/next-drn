'use client';

import { Container, Typography } from '@mui/material';
import useAdminMenu from './AdminMenu.hook';
import AddMenuDialog from 'components/AddMenuDialog/AddMenuDialog';
import MenuCard from 'components/MenuCard/MenuCard';

export default function AdminMenuPage() {
  const {
    menus,
    handleReload,
    openAddDialog,
    setOpenAddDialog,
  } = useAdminMenu();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography variant="h4" gutterBottom>
        Меню
      </Typography>

      <AddMenuDialog open={ openAddDialog } onClose={ () => setOpenAddDialog(false) } onAdd={ handleReload } />

      <div className="flex justify-end mb-4">
        <button onClick={ () => setOpenAddDialog(true) } className="px-4 py-2 bg-blue-500 text-white rounded">
          Додати меню
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          menus.map((menu) => (
            <MenuCard key={ menu.id } menu={ menu } onChange={ handleReload } />
          ))
        }
      </div>
    </Container>
  );
}
