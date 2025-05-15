'use client';

import { Delete, Edit } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import EditMenuDialog from '../EditMenuDialog/EditMenuDialog';
import useMenuCard from './MenuCard.hook';
import { MenuCardPropsType } from './MenuCard.types';

const MenuCard: FC<MenuCardPropsType> = ({ menu, onChange }) => {
  const {
    openEdit,
    handleOpenModal,
    handleDelete,
  } = useMenuCard(menu, onChange);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{ menu.title }</Typography>
        <Typography variant="body2">Тип: { menu.type }</Typography>
        <div className="flex justify-end mt-2 gap-2">
          <IconButton onClick={ () => handleOpenModal(true) }>
            <Edit />
          </IconButton>
          <IconButton onClick={ handleDelete }>
            <Delete />
          </IconButton>
        </div>
      </CardContent>

      <EditMenuDialog open={ openEdit } onClose={ () => handleOpenModal(false) } menu={ menu } onUpdate={ onChange } />
    </Card>
  );
};

export default MenuCard;
