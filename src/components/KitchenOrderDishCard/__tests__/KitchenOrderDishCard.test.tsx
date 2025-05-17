/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KitchenOrderDishCard from '../KitchenOrderDishCard';
import { Role, StatusDish } from 'basics/enums/schema.enums';
import { OrderDish } from 'basics/types/schema.types';
import * as apiDishes from 'lib/api/dishes';
import * as apiEmployees from 'lib/api/employees';
import * as apiOrderDishes from 'lib/api/orderDishes';

jest.mock('lib/api/dishes');
jest.mock('lib/api/employees');
jest.mock('lib/api/orderDishes');

const mockDish = { id: 'd1', title: 'Суп' };
const mockChefs = [
  { id: 'e1', first_name: 'Іван', last_name: 'Петров', role: Role.KITCHEN },
  { id: 'e2', first_name: 'Олег', last_name: 'Сидоренко', role: Role.KITCHEN },
];

const orderDishDefault: OrderDish = {
  id: 'od1',
  dish_id: 'd1',
  chef_id: '',
  status: StatusDish.NEW,
  order_id: 'o1',
  start_time: new Date(),
};

describe('Компонент KitchenOrderDishCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiDishes.getDishById as jest.Mock).mockResolvedValue(mockDish);
    (apiEmployees.getEmployees as jest.Mock).mockResolvedValue(mockChefs);
    (apiOrderDishes.updateOrderDish as jest.Mock).mockResolvedValue({});
  });

  it('renders the dish name and status', async () => {
    render(<KitchenOrderDishCard orderDish={ orderDishDefault } onUpdate={ jest.fn() } />);
    await waitFor(() => {
      expect(screen.getByText(/Страва: Суп/)).toBeInTheDocument();
      expect(screen.getByText(/Статус: NEW/)).toBeInTheDocument();
    });
  });

  it('triggers an update when a cook is assigned', async () => {
    const onUpdateMock = jest.fn();
    render(<KitchenOrderDishCard orderDish={ orderDishDefault } onUpdate={ onUpdateMock } />);
    await waitFor(() => userEvent.click(screen.getByLabelText(/Вибрати кухаря/)));
    userEvent.click(screen.getByText('Іван Петров'));
    await waitFor(() => {
      expect(apiOrderDishes.updateOrderDish).toHaveBeenCalledWith(orderDishDefault.id, {
        chef_id: 'e1',
        status: StatusDish.COOKING,
      });
      expect(onUpdateMock).toHaveBeenCalled();
    });
  });

  it('triggers an update when a cook is assigned', async () => {
    render(<KitchenOrderDishCard orderDish={ { ...orderDishDefault, status: StatusDish.COOKING } } onUpdate={ jest.fn() } />);
    expect(await screen.findByText('Позначити як готово')).toBeInTheDocument();
  });

  it('clicking the "Mark as done" button causes a status update and list refresh', async () => {
    const onUpdateMock = jest.fn();
    render(<KitchenOrderDishCard orderDish={ { ...orderDishDefault, status: StatusDish.COOKING } } onUpdate={ onUpdateMock } />);
    const button = await screen.findByText('Позначити як готово');
    userEvent.click(button);
    await waitFor(() => {
      expect(apiOrderDishes.updateOrderDish).toHaveBeenCalledWith(orderDishDefault.id, {
        status: StatusDish.DONE,
      });
      expect(onUpdateMock).toHaveBeenCalled();
    });
  });
});
