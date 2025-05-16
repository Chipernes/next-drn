import { useState } from 'react';
import { Table } from 'basics/types/schema.types';
import { deleteTable } from 'lib/api/tables';

const useTableCard = (table: Table, onChange: () => void) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = (value: boolean) => setOpenEdit(value);

  const handleDelete = async () => {
    await deleteTable(table.id);
    onChange();
  };

  return {
    openEdit,
    handleOpen,
    handleDelete,
  };
};

export default useTableCard;
