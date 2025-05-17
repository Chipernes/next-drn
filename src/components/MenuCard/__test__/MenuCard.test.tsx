import { render, screen } from '@testing-library/react';
import MenuCard from '../MenuCard';
import { Menu } from 'basics/types/schema.types';

jest.mock('lib/api/menus');

const mockMenu: Menu = {
  id: 'm1',
  title: 'Main Menu',
  type: 'DINNER',
  createdAt: new Date(),
};

describe('MenuCard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders menu title and type', () => {
    render(<MenuCard menu={ mockMenu } onChange={ jest.fn() } />);
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
    expect(screen.getByText(/Тип: DINNER/)).toBeInTheDocument();
  });
});
