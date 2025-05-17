/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../page';
import useService from '../service.hook';

jest.mock('../service.hook');
jest.mock('components/AddOrderModal/AddOrderModal', () => ({
  AddOrderModal: (props: any) => (
    <div data-testid="add-order-modal" hidden={ !props.open }>
      Модальне вікно
      <button onClick={ () => props.onClose() }>Закрити</button>
    </div>
  ),
}));
jest.mock('components/OrderCard/OrderCard', () => (props: any) => (
  <div data-testid="order-card">
    { props.order.id } - Столик №{ props.selectedTableNumber }
  </div>
));

const mockedUseService = useService as jest.Mock;

describe('Page', () => {
  const mockOrders = [
    { id: 'order1', table_id: 'table1' },
    { id: 'order2', table_id: 'table2' },
  ];

  const mockTables = [
    { id: 'table1', number: 3 },
    { id: 'table2', number: 1 },
  ];

  beforeEach(() => {
    mockedUseService.mockReturnValue({
      modalOpen: false,
      handleModalOpen: jest.fn(),
      updateOrders: jest.fn(),
      sortedOrders: mockOrders.sort((a, b) => {
        const aNum = mockTables.find((t) => t.id === a.table_id)?.number || 0;
        const bNum = mockTables.find((t) => t.id === b.table_id)?.number || 0;
        return aNum - bNum;
      }),
      getAssociatedTable: (id: string) => mockTables.find((t) => t.id === id)?.number || 0,
    });
  });

  it('renders the "Add Order" button and the popup window is closed', () => {
    render(<Page />);
    expect(screen.getByText('Додати замовлення')).toBeInTheDocument();
    expect(screen.getByTestId('add-order-modal')).not.toBeVisible();
  });

  it('renders orders in sorted order by table number', () => {
    render(<Page />);
    const cards = screen.getAllByTestId('order-card');
    expect(cards).toHaveLength(2);

    expect(cards[0]).toHaveTextContent('order2');
    expect(cards[0]).toHaveTextContent('Столик №1');

    expect(cards[1]).toHaveTextContent('order1');
    expect(cards[1]).toHaveTextContent('Столик №3');
  });

  it('calls handleModalOpen when the button is clicked', () => {
    const handleModalOpen = jest.fn();
    mockedUseService.mockReturnValue({
      modalOpen: false,
      handleModalOpen,
      updateOrders: jest.fn(),
      sortedOrders: [],
      getAssociatedTable: () => 0,
    });

    render(<Page />);
    fireEvent.click(screen.getByText('Додати замовлення'));
    expect(handleModalOpen).toHaveBeenCalledWith(true);
  });
});
