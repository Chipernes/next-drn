'use client';

import { Container, Typography } from '@mui/material';
import useAdminMenu from './AdminMenu.hook';
import AddMenuDialog from 'components/AddMenuDialog/AddMenuDialog';
import MenuCard from 'components/MenuCard/MenuCard';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

export default function AdminMenuPage() {
  const {
    menus,
    handleReload,
    openAddDialog,
    setOpenAddDialog,
  } = useAdminMenu();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Меню
      </Typography>

      <AddMenuDialog open={ openAddDialog } onClose={ () => setOpenAddDialog(false) } onAdd={ handleReload } />

      <Box className="flex justify-center mb-4">
        <Button onClick={ () => setOpenAddDialog(true) } className="px-4 py-2 bg-blue-500 text-white rounded">
          Додати меню
        </Button>
      </Box>

      {
        !menus.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              menus.map((menu) => (
                <MenuCard key={ menu.id } menu={ menu } onChange={ handleReload } />
              ))
            }
          </Box>
      }
    </Container>
  );
}
