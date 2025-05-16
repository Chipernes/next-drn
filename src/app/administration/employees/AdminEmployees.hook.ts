'use client';

import { useEffect, useState } from 'react';
import { Employee } from 'basics/types/schema.types';
import { getEmployees } from 'lib/api/employees';

const useAdminEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  const getAllEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return {
    employees,
    openAdd,
    setOpenAdd,
    getAllEmployees,
  };
};

export default useAdminEmployees;
