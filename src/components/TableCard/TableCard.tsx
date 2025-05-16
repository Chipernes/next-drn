'use client';

import { Edit, Delete } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import EditTableDialog from '../EditTableDialog/EditTableDialog';
import useTableCard from './TableCard.hook';
import { Table } from 'basics/types/schema.types';

type Props = {
  table: Table;
  onChange: () => void;
};

const TableCard: FC<Props> = ({ table, onChange }) => {
  const { openEdit, handleOpen, handleDelete } = useTableCard(table, onChange);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Стіл #{ table.number }</Typography>
        <div className="flex justify-end mt-2 gap-2">
          <IconButton onClick={ () => handleOpen(true) }>
            <Edit />
          </IconButton>
          <IconButton onClick={ handleDelete }>
            <Delete />
          </IconButton>
        </div>
      </CardContent>
      <EditTableDialog open={ openEdit } onClose={ () => handleOpen(false) } table={ table } onUpdate={ onChange } />
    </Card>
  );
};

export default TableCard;
