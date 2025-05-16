'use client';

import { Delete, Edit } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography, Chip, Stack } from '@mui/material';
import { IKImage } from 'imagekitio-next';
import { FC } from 'react';
import { config } from '../../config/config';
import EditDishDialog from '../EditDishDialog/EditDishDialog';
import useDishCard from './DishCard.hook';
import { DishCardPropsType } from './DishCard.types';

const DishCard: FC<DishCardPropsType> = ({ dish, onChange, menus }) => {
  const { openEdit, handleOpenModal, handleDelete } = useDishCard(dish, onChange);

  const menu = menus.find((m) => m.id === dish.menu_id);

  return (
    <Card>
      <CardContent>
        {
          dish.picture && (
            <IKImage
              urlEndpoint={ config.env.imagekit.urlEndpoint }
              path={ dish.picture }
              alt="Dish image"
              width={ 152 }
              height={ 114 }
              className="w-[152px] h-[114px] rounded-lg mb-3 object-cover"
            />
          )
        }
        <Typography variant="h6">{ dish.title }</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          { dish.description }
        </Typography>

        <Stack direction="row" spacing={ 1 } sx={ { mt: 1 } }>
          <Chip label={ `Ціна: ${dish.price} грн` } size="small" />
          <Chip label={ `Вага: ${dish.weight} г` } size="small" />
        </Stack>

        <Stack direction="row" spacing={ 1 } sx={ { mt: 1 } }>
          <Chip
            label={ menu?.title || 'Без меню' }
            color="primary"
            size="small"
            variant="outlined"
          />
          { dish.isHidden && <Chip label="Приховано" color="warning" size="small" /> }
        </Stack>

        <div className="flex justify-end mt-4 gap-2">
          <IconButton onClick={ () => handleOpenModal(true) }>
            <Edit />
          </IconButton>
          <IconButton onClick={ handleDelete }>
            <Delete />
          </IconButton>
        </div>
      </CardContent>

      <EditDishDialog
        open={ openEdit }
        onClose={ () => handleOpenModal(false) }
        dish={ dish }
        onUpdate={ onChange }
        menus={ menus }
      />
    </Card>
  );
};

export default DishCard;
