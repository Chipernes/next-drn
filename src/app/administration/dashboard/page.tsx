'use client';

import { Container, Typography } from '@mui/material';
import useAdminDashboard from './AdminDashboard.hook';
import DashboardPieChart from 'components/DashboardPieChart/DashboardPieChart';
import DashboardStatCard from 'components/DashboardStatCard/DashboardStatCard';
import Box from 'yoda-ui/components/Box';

const AdminDashboardPage = () => {
  const { stats, chartData } = useAdminDashboard();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography variant="h4" gutterBottom>
        Аналітика
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStatCard title="Сьогоднішні замовлення" value={ stats.todayOrders } />
        <DashboardStatCard title="Виручка за сьогодні" value={ `${stats.todayRevenue} грн` } />
        <DashboardStatCard title="Найпопулярніша страва" value={ stats.topDishTitle || '—' } />
      </Box>

      <Box className="mt-6">
        <DashboardPieChart title="Статуси замовлень" data={ chartData.statusDistribution } />
      </Box>
    </Container>
  );
};

export default AdminDashboardPage;
