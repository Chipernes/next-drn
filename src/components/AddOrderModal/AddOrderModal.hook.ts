import { useEffect, useState } from 'react';
import { Role } from 'basics/enums/schema.enums';
import { Employee, Table } from 'basics/types/schema.types';
import { getEmployees } from 'lib/api/employees';
import { createOrder } from 'lib/api/orders';
import { getTables } from 'lib/api/tables';

const useAddOrderModal = (onClose: Function, updateOrders: Function) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedWaiter, setSelectedWaiter] = useState('');
  const waiters = employees.filter((employee) => employee.role === Role.SERVICE);

  useEffect(() => {
    getTables().then(setTables);
    getEmployees().then(setEmployees);
  }, []);

  const handleSelectedTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleSelectedWaiter = (waiter: string) => {
    setSelectedWaiter(waiter);
  };

  const handleCreateOrder = async (tableId: string, waiterId: string) => {
    await createOrder(tableId, waiterId);
    onClose();
    updateOrders();
  };

  return {
    selectedTable,
    handleSelectedTable,
    tables,
    selectedWaiter,
    handleSelectedWaiter,
    waiters,
    handleCreateOrder,
  };
};

export default useAddOrderModal;
