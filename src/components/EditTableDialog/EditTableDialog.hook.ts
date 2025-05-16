import { useState } from 'react';
import { Table } from 'basics/types/schema.types';
import { updateTable } from 'lib/api/tables';

const useEditTableDialog = (table: Table, onUpdate: () => void, onClose: () => void) => {
  const [number, setNumber] = useState(table.number);

  const handleSubmit = async () => {
    await updateTable(table.id, { number });
    onUpdate();
    onClose();
  };

  return {
    number,
    handleChange: setNumber,
    handleSubmit,
  };
};

export default useEditTableDialog;
