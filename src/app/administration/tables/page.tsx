'use client';

import { Container, Typography } from '@mui/material';
import useAdminTables from './AdminTables.hook';
import AddTableDialog from 'components/AddTableDialog/AddTableDialog';
import TableCard from 'components/TableCard/TableCard';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

const AdminTablesPage = () => {
  const {
    setOpenAdd,
    tables,
    getAllTables,
    openAdd,
  } = useAdminTables();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Столи
      </Typography>

      <AddTableDialog open={ openAdd } onClose={ () => setOpenAdd(false) } onCreate={ getAllTables } />

      <Box className="flex justify-center mb-4">
        <Button onClick={ () => setOpenAdd(true) } className="px-4 py-2 bg-blue-500 text-white rounded">
          Додати стіл
        </Button>
      </Box>

      {
        !tables.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              tables.map((table) => (
                <TableCard key={ table.id } table={ table } onChange={ getAllTables } />
              ))
            }
          </Box>
      }
    </Container>
  );
};

export default AdminTablesPage;
