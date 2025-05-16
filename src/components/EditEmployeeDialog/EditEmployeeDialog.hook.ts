import { useState } from 'react';
import { Role } from 'basics/enums/schema.enums';
import { Employee } from 'basics/types/schema.types';
import { updateEmployee } from 'lib/api/employees';

const useEditEmployeeDialog = (
  employee: Employee,
  onUpdate: () => void,
  onClose: () => void,
) => {
  const [firstName, setFirstName] = useState(employee.first_name);
  const [lastName, setLastName] = useState(employee.last_name);
  const [role, setRole] = useState<Role>(employee.role);

  const handleUpdate = async () => {
    await updateEmployee(employee.id, {
      first_name: firstName,
      last_name: lastName,
      role,
    });
    onUpdate();
    onClose();
  };

  return {
    firstName,
    lastName,
    role,
    handleUpdate,
    handleChangeFirstName: setFirstName,
    handleChangeLastName: setLastName,
    handleChangeRole: setRole,
  };
};

export default useEditEmployeeDialog;
