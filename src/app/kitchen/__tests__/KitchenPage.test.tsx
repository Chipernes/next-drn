/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import useKitchen from '../kitchen.hook';
import KitchenPage from '../page';
import { StatusDish } from 'basics/enums/schema.enums';
import { OrderDish } from 'basics/types/schema.types';

jest.mock('../kitchen.hook');
jest.mock('components/KitchenOrderDishCard/KitchenOrderDishCard', () => (props: any) => {
  // console.log('KitchenOrderDishCard props:', props.orderDish);
  return <div data-testid="kitchen-order-dish-card">{ props.orderDish?.id ?? 'no-id' }</div>;
});

const mockedUseKitchen = useKitchen as jest.Mock;

describe('KitchenPage', () => {
  const mockDishes: OrderDish[] = [
    {
      id: '1',
      order_id: 'order1',
      dish_id: 'dish1',
      status: StatusDish.NEW,
      start_time: new Date(),
    },
    {
      id: '2',
      order_id: 'order2',
      dish_id: 'dish2',
      status: StatusDish.COOKING,
      start_time: new Date(),
    },
  ];

  beforeEach(() => {
    mockedUseKitchen.mockReturnValue({
      orderDishes: mockDishes,
      handleUpdate: jest.fn(),
    });
  });

  it('renders heading and order dishes', () => {
    render(<KitchenPage />);

    expect(screen.getByText('Страви на кухні')).toBeInTheDocument();

    const cards = screen.getAllByTestId('kitchen-order-dish-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('1');
    expect(cards[1]).toHaveTextContent('2');
  });
});
