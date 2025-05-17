import { render, screen, fireEvent } from '@testing-library/react';
import OrderCard from '../OrderCard';
import * as useOrderCardModule from '../OrderCard.hook';
import { StatusOrder, StatusDish } from 'basics/enums/schema.enums';
import { Order } from 'basics/types/schema.types';

jest.mock('../OrderCard.hook');

const mockOnOrderUpdate = jest.fn();

const mockOrder = {
  id: 'order-1',
  waiter_id: 'waiter-1',
  status: StatusOrder.NEW,
} as Order;

const mockDishes = [
  { id: 'dish-1', title: 'Борщ' },
  { id: 'dish-2', title: 'Вареники' },
];

const mockEmployees = [
  { id: 'waiter-1', first_name: 'Іван', last_name: 'Іванов' },
];

const mockOrderDishes = [
  { id: 'order-dish-1', dish_id: 'dish-1', order_id: 'order-1', status: StatusDish.NEW },
];

const setupHookMock = (overrides = {}) => {
  (useOrderCardModule.default as jest.Mock).mockReturnValue({
    selectedWaiter: mockEmployees[0],
    dishes: mockDishes,
    orderDishes: mockOrderDishes,
    open: false,
    handleOpenManageModal: jest.fn(),
    handleUpdateOrderDishStatus: jest.fn(),
    handleDeleteOrderDish: jest.fn(),
    handleDishInput: jest.fn(),
    selectedDishId: '',
    handleUpdateOrderStatus: jest.fn(),
    handleDeleteOrder: jest.fn(),
    handleAddDish: jest.fn(),
    ...overrides,
  });
};

describe('OrderCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table number and waiter name', () => {
    setupHookMock();
    render(<OrderCard order={ mockOrder } onOrderUpdate={ mockOnOrderUpdate } selectedTableNumber={ 3 } />);

    expect(screen.getByText(/Стіл №3/)).toBeInTheDocument();
    expect(screen.getByText(/Офіціант: Іван Іванов/)).toBeInTheDocument();
  });

  it('does not render if order status is DONE', () => {
    setupHookMock();
    const doneOrder = { ...mockOrder, status: StatusOrder.DONE };
    const { container } = render(<OrderCard order={ doneOrder } onOrderUpdate={ mockOnOrderUpdate } selectedTableNumber={ 3 } />);
    expect(container.firstChild).toBeNull();
  });

  it('renders dishes in modal and allows changing status and deleting', () => {
    const handleUpdateOrderDishStatus = jest.fn();
    const handleDeleteOrderDish = jest.fn();
    const handleOpenManageModal = jest.fn();

    setupHookMock({
      open: true,
      handleOpenManageModal,
      handleUpdateOrderDishStatus,
      handleDeleteOrderDish,
    });

    render(<OrderCard order={ mockOrder } onOrderUpdate={ mockOnOrderUpdate } selectedTableNumber={ 3 } />);

    expect(screen.getByText(/Керування замовленням/)).toBeInTheDocument();
    expect(screen.getByText(/Борщ/)).toBeInTheDocument();

    const statusButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(statusButtons[0]);
    expect(handleUpdateOrderDishStatus).toHaveBeenCalled();
  });
});
