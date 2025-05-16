'use client';

import { useEffect, useState } from 'react';
import { StatusOrder } from 'basics/enums/schema.enums';
import { getDishes } from 'lib/api/dishes';
import { getOrderDishes } from 'lib/api/orderDishes';
import { getOrders } from 'lib/api/orders';

const useAdminDashboard = () => {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    topDishTitle: '',
  });

  const [chartData, setChartData] = useState({
    statusDistribution: [] as { name: string; value: number }[],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [orders, orderDishes, dishes] = await Promise.all([
        getOrders(),
        getOrderDishes(),
        getDishes(),
      ]);

      const today = new Date().toISOString().split('T')[0];

      const todayOrders = orders.filter((order) => {
        const created = new Date(order.createdAt).toISOString().split('T')[0];
        return created === today;
      });

      const todayRevenue = todayOrders.reduce((total, order) => {
        const dishPrices = orderDishes
          .filter((od) => od.order_id === order.id)
          .map((od) => {
            const dish = dishes.find((d) => d.id === od.dish_id);
            return dish?.price || 0;
          });

        return total + dishPrices.reduce((sum, price) => sum + price, 0);
      }, 0);

      const dishUsageMap = orderDishes.reduce<Record<string, number>>((acc, od) => {
        acc[od.dish_id] = (acc[od.dish_id] || 0) + 1;
        return acc;
      }, {});

      const topDishId = Object.entries(dishUsageMap).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];

      const topDishTitle = dishes.find((d) => d.id === topDishId)?.title || '';

      const statusDist = Object.values(StatusOrder).map((status) => ({
        name: status,
        value: orders.filter((o) => o.status === status).length,
      }));

      setStats({
        todayOrders: todayOrders.length,
        todayRevenue,
        topDishTitle,
      });

      setChartData({
        statusDistribution: statusDist,
      });
    };

    fetchStats();
  }, []);

  return { stats, chartData };
};

export default useAdminDashboard;
