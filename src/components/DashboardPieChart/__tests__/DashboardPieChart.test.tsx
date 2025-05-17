import { render, screen } from '@testing-library/react';
import DashboardPieChart from '../DashboardPieChart';

describe('DashboardPieChart', () => {
  const title = 'Test Chart';
  const data = [
    { name: 'Category A', value: 100 },
    { name: 'Category B', value: 200 },
    { name: 'Category C', value: 300 },
  ];

  beforeAll(() => {
    class ResizeObserver {
      observe() {}

      unobserve() {}

      disconnect() {}
    }
    global.ResizeObserver = ResizeObserver;
  });

  it('renders the chart title', () => {
    render(<DashboardPieChart title={ title } data={ data } />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
