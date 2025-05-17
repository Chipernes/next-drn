import {
  getOrderDishes,
  createOrderDish,
  updateOrderDish,
  deleteOrderDish,
} from '../orderDishes';
import { StatusDish } from 'basics/enums/schema.enums';
import { OrderDish } from 'basics/types/schema.types';

global.fetch = jest.fn();

const mockOrderDish: OrderDish = {
  id: 'orderDish-1',
  order_id: 'order-1',
  dish_id: 'dish-1',
  status: StatusDish.NEW,
  start_time: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('OrderDish API', () => {
  it('getOrderDishes returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockOrderDish]),
    });

    const result = await getOrderDishes();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/orderDishes'));
    expect(result).toEqual([mockOrderDish]);
  });

  it('createOrderDish sends POST and returns data', async () => {
    const payload = { order_id: '1', dish_id: '2', status: StatusDish.NEW, start_time: new Date() };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...payload, id: 'orderDish-2' }),
    });

    const result = await createOrderDish(payload);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/orderDishes'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(payload),
    }));
    expect(result.id).toBe('orderDish-2');
  });

  it('updateOrderDish sends PATCH and returns data', async () => {
    const patch = { status: StatusDish.COOKING };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...mockOrderDish, ...patch }),
    });

    const result = await updateOrderDish(mockOrderDish.id, patch);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/orderDishes/${mockOrderDish.id}`), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(patch),
    }));
    expect(result.status).toBe(StatusDish.COOKING);
  });

  it('deleteOrderDish sends DELETE', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteOrderDish(mockOrderDish.id);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/orderDishes/${mockOrderDish.id}`), expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('getOrderDishes throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getOrderDishes()).rejects.toThrow('Failed to get order dishes');
  });

  it('createOrderDish throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createOrderDish({})).rejects.toThrow('Failed to create order dish');
  });

  it('updateOrderDish throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateOrderDish('id', {})).rejects.toThrow('Failed to update order dish');
  });

  it('deleteOrderDish throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteOrderDish('id')).rejects.toThrow('Failed to delete order dish');
  });
});
