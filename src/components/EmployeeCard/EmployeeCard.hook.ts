import { useState } from 'react';
import { Employee } from 'basics/types/schema.types';
import { deleteEmployee } from 'lib/api/employees';

const useEmployeeCard = (employee: Employee, onChange: Function) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenModal = (value: boolean) => setOpenEdit(value);

  const handleDelete = async () => {
    await deleteEmployee(employee.id);
    onChange();
  };

  return {
    openEdit,
    handleOpenModal,
    handleDelete,
  };
};

export default useEmployeeCard;
