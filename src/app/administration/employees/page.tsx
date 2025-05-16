'use client';

import { Container, Typography } from '@mui/material';
import useAdminEmployees from './AdminEmployees.hook';
import AddEmployeeDialog from 'components/AddEmployeeDialog/AddEmployeeDialog';
import EmployeeCard from 'components/EmployeeCard/EmployeeCard';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';

const EmployeesPage = () => {
  const {
    employees,
    openAdd,
    setOpenAdd,
    getAllEmployees,
  } = useAdminEmployees();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography variant="h4" gutterBottom>
        Співробітники
      </Typography>

      <Box className="flex justify-center mb-4">
        <Button onClick={ () => setOpenAdd(true) } className="px-4 py-2 bg-blue-500 text-white rounded">
          Додати працівника
        </Button>
      </Box>

      <AddEmployeeDialog open={ openAdd } onClose={ () => setOpenAdd(false) } onAdd={ getAllEmployees } />

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          employees.map((employee) => (
            <EmployeeCard key={ employee.id } employee={ employee } onChange={ getAllEmployees } />
          ))
        }
      </Box>
    </Container>
  );
};

export default EmployeesPage;
