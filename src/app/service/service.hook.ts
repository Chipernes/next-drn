'use client';

import { useEffect, useState } from 'react';
import { Order, Table } from 'basics/types/schema.types';
import { getOrders } from 'lib/api/orders';
import { getTables } from 'lib/api/tables';

const useService = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
    getTables().then(setTables);
  }, [setOrders]);

  const updateOrders = () => {
    getOrders().then(setOrders);
    getTables().then(setTables);
  };

  const handleModalOpen = (type: boolean) => {
    setModalOpen(type);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const tableA = tables.find((t) => t.id === a.table_id);
    const tableB = tables.find((t) => t.id === b.table_id);
    return (tableA?.number || 0) - (tableB?.number || 0);
  });
  const getAssociatedTable = (orderTableId: string) => {
    const selectedTable = tables.find((table) => table.id === orderTableId);
    return selectedTable?.number || 0;
  };

  return {
    modalOpen,
    handleModalOpen,
    updateOrders,
    sortedOrders,
    getAssociatedTable,
  };
};

export default useService;
