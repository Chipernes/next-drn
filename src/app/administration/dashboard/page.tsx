'use client';

import { Container, Typography } from '@mui/material';
import useAdminDashboard from './AdminDashboard.hook';
import DashboardPieChart from 'components/DashboardPieChart/DashboardPieChart';
import DashboardStatCard from 'components/DashboardStatCard/DashboardStatCard';
import Box from 'yoda-ui/components/Box';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

const AdminDashboardPage = () => {
  const { stats, chartData } = useAdminDashboard();

  return (
    <Container sx={ { mt: 4 } }>
      <Typography className='text-center' variant="h4" gutterBottom>
        Аналітика
      </Typography>

      {
        !chartData.statusDistribution.length
          ? <Box className="w-100 flex justify-center"><Loader center color={ YodaColors.black }/></Box>
          : <Box>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DashboardStatCard title="Сьогоднішні замовлення" value={ stats.todayOrders } />
              <DashboardStatCard title="Виручка за сьогодні" value={ `${stats.todayRevenue} грн` } />
              <DashboardStatCard title="Найпопулярніша страва" value={ stats.topDishTitle || '—' } />
            </Box>

            <Box className="mt-6">
              <DashboardPieChart title="Статуси замовлень" data={ chartData.statusDistribution } />
            </Box>
          </Box>
      }
    </Container>
  );
};

export default AdminDashboardPage;
