/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddOrderModal } from '../AddOrderModal';

jest.mock('../AddOrderModal.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAddOrderModal = require('../AddOrderModal.hook').default;

describe('AddOrderModal', () => {
  const mockOnClose = jest.fn();
  const mockUpdateOrders = jest.fn();
  const mockHandleSelectedTable = jest.fn();
  const mockHandleSelectedWaiter = jest.fn();
  const mockHandleCreateOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddOrderModal.mockReturnValue({
      selectedTable: '1',
      handleSelectedTable: mockHandleSelectedTable,
      tables: [
        { id: '1', number: 1 },
        { id: '2', number: 2 },
      ],
      selectedWaiter: '10',
      handleSelectedWaiter: mockHandleSelectedWaiter,
      waiters: [
        { id: '10', first_name: 'Анна', last_name: 'Коваль', role: 'SERVICE' },
        { id: '11', first_name: 'Олег', last_name: 'Шевченко', role: 'SERVICE' },
      ],
      handleCreateOrder: mockHandleCreateOrder,
    });
  });

  it('calls handleCreateOrder when Створити clicked', async () => {
    render(<AddOrderModal open={ true } onClose={ mockOnClose } updateOrders={ mockUpdateOrders } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Створити'));
    expect(mockHandleCreateOrder).toHaveBeenCalledWith('1', '10');
  });

  it('calls onClose when Скасувати clicked', async () => {
    render(<AddOrderModal open={ true } onClose={ mockOnClose } updateOrders={ mockUpdateOrders } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Скасувати'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
