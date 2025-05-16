'use client';

import { Delete, Edit } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography, Avatar } from '@mui/material';
import { FC } from 'react';
import EditEmployeeDialog from '../EditEmployeeDialog/EditEmployeeDialog';
import useEmployeeCard from './EmployeeCard.hook';
import { EmployeeCardPropsType } from './EmployeeCard.types';

const EmployeeCard: FC<EmployeeCardPropsType> = ({ employee, onChange }) => {
  const { openEdit, handleOpenModal, handleDelete } = useEmployeeCard(employee, onChange);

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-4">
          <Avatar src={ employee.picture } alt={ `${employee.first_name} ${employee.last_name}` } />
          <div className="flex-grow">
            <Typography variant="h6">{ employee.first_name } { employee.last_name }</Typography>
            <Typography variant="body2" color="text.secondary">{ employee.role }</Typography>
          </div>

          <IconButton onClick={ () => handleOpenModal(true) } aria-label="Редагувати">
            <Edit />
          </IconButton>
          <IconButton onClick={ handleDelete } aria-label="Видалити">
            <Delete />
          </IconButton>
        </CardContent>
      </Card>

      <EditEmployeeDialog open={ openEdit } onClose={ () => handleOpenModal(false) } employee={ employee } onUpdate={ onChange } />
    </>
  );
};

export default EmployeeCard;
