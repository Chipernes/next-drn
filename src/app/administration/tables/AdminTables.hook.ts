'use client';

import { useEffect, useState } from 'react';
import { Table } from 'basics/types/schema.types';
import { getTables } from 'lib/api/tables';

const useAdminTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  const getAllTables = async () => {
    const allTables = await getTables();
    setTables(allTables);
  };

  useEffect(() => {
    getAllTables();
  }, []);

  return {
    setOpenAdd,
    tables,
    getAllTables,
    openAdd,
  };
};

export default useAdminTables;
