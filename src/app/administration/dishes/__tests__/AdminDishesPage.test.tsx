/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDishesPage from '../page';

const mockSetOpenAddDialog = jest.fn();
const mockHandleReload = jest.fn();

let hookReturnValue: any = {
  dishes: [
    { id: '1', name: 'Борщ', price: 100, menuId: 'menu1', status: 'AVAILABLE' },
    { id: '2', name: 'Вареники', price: 120, menuId: 'menu1', status: 'AVAILABLE' },
  ],
  menus: [{ id: 'menu1', name: 'Основне меню' }],
  handleReload: mockHandleReload,
  openAddDialog: false,
  setOpenAddDialog: mockSetOpenAddDialog,
};

jest.mock('../AdminDishes.hook', () => ({
  __esModule: true,
  default: () => hookReturnValue,
}));

jest.mock('components/AddDishDialog/AddDishDialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (open ? <div>Mocked AddDishDialog Open</div> : null),
}));

jest.mock('components/DishCard/DishCard', () => ({
  __esModule: true,
  default: ({ dish }: { dish: any }) => <div>{ dish.name }</div>,
}));

describe('AdminDishesPage', () => {
  beforeEach(() => {
    mockSetOpenAddDialog.mockClear();
    mockHandleReload.mockClear();

    hookReturnValue = {
      dishes: [
        { id: '1', name: 'Борщ', price: 100, menuId: 'menu1', status: 'AVAILABLE' },
        { id: '2', name: 'Вареники', price: 120, menuId: 'menu1', status: 'AVAILABLE' },
      ],
      menus: [{ id: 'menu1', name: 'Основне меню' }],
      handleReload: mockHandleReload,
      openAddDialog: false,
      setOpenAddDialog: mockSetOpenAddDialog,
    };
  });

  it('renders the page title and dishes', () => {
    render(<AdminDishesPage />);

    expect(screen.getByText('Страви')).toBeInTheDocument();
    expect(screen.getByText('Борщ')).toBeInTheDocument();
    expect(screen.getByText('Вареники')).toBeInTheDocument();
  });

  it('opens AddDishDialog on button click', () => {
    render(<AdminDishesPage />);

    const button = screen.getByRole('button', { name: 'Додати страву' });
    fireEvent.click(button);

    expect(mockSetOpenAddDialog).toHaveBeenCalledWith(true);
  });

  it('shows AddDishDialog if openAddDialog is true', () => {
    hookReturnValue.openAddDialog = true;
    render(<AdminDishesPage />);
    expect(screen.getByText('Mocked AddDishDialog Open')).toBeInTheDocument();
  });
});
