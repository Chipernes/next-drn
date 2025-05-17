/* eslint-disable react/display-name */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboardPage from '../page';

jest.mock('../AdminDashboard.hook', () => ({
  __esModule: true,
  default: () => ({
    stats: {
      todayOrders: 5,
      todayRevenue: 2500,
      topDishTitle: 'Борщ',
    },
    chartData: {
      statusDistribution: [
        { name: 'NEW', value: 2 },
        { name: 'COOKING', value: 2 },
        { name: 'DONE', value: 1 },
      ],
    },
  }),
}));

jest.mock('components/DashboardPieChart/DashboardPieChart', () => () => <div>Mocked Chart</div>);

describe('AdminDashboardPage', () => {
  it('renders title and stat cards', () => {
    render(<AdminDashboardPage />);

    expect(screen.getByText('Аналітика')).toBeInTheDocument();
    expect(screen.getByText('Сьогоднішні замовлення')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Виручка за сьогодні')).toBeInTheDocument();
    expect(screen.getByText('2500 грн')).toBeInTheDocument();

    expect(screen.getByText('Найпопулярніша страва')).toBeInTheDocument();
    expect(screen.getByText('Борщ')).toBeInTheDocument();
  });

  it('renders pie chart title', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Mocked Chart')).toBeInTheDocument();
  });
});
