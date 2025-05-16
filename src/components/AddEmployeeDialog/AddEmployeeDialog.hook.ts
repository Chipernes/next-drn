import { useState } from 'react';
import { Role } from 'basics/enums/schema.enums';
import { createEmployee } from 'lib/api/employees';

const useAddEmployeeDialog = (onAdd: () => void, onClose: () => void) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<Role>(Role.SERVICE);

  const handleAdd = async () => {
    await createEmployee({ first_name: firstName, last_name: lastName, role });
    onAdd();
    onClose();
    setFirstName('');
    setLastName('');
    setRole(Role.SERVICE);
  };

  return {
    firstName,
    lastName,
    role,
    handleAdd,
    handleChangeFirstName: setFirstName,
    handleChangeLastName: setLastName,
    handleChangeRole: setRole,
  };
};

export default useAddEmployeeDialog;
