import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../orders';
import { StatusOrder } from 'basics/enums/schema.enums';
import { Order } from 'basics/types/schema.types';

global.fetch = jest.fn();

const mockOrder: Order = {
  id: 'order-1',
  table_id: 'table-1',
  waiter_id: 'waiter-1',
  status: StatusOrder.NEW,
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Order API', () => {
  it('getOrders returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockOrder]),
    });

    const result = await getOrders();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/orders'));
    expect(result).toEqual([mockOrder]);
  });

  it('createOrder sends POST and returns order', async () => {
    const tableId = 'table-1';
    const waiterId = 'waiter-1';
    const mockCreatedOrder = { ...mockOrder, id: 'order-2' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCreatedOrder),
    });

    const result = await createOrder(tableId, waiterId);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/orders'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ tableId, waiterId }),
    }));
    expect(result.id).toBe('order-2');
  });

  it('updateOrder sends PATCH and returns updated order', async () => {
    const patch = { status: StatusOrder.PROCESSING };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...mockOrder, ...patch }),
    });

    const result = await updateOrder(mockOrder.id, patch);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/orders/${mockOrder.id}`), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(patch),
    }));
    expect(result.status).toBe(StatusOrder.PROCESSING);
  });

  it('deleteOrder sends DELETE', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteOrder(mockOrder.id);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/orders/${mockOrder.id}`), expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('getOrders throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getOrders()).rejects.toThrow('Failed to get orders');
  });

  it('createOrder throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createOrder('table', 'waiter')).rejects.toThrow('Failed to create order');
  });

  it('updateOrder throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateOrder('id', {})).rejects.toThrow('Failed to update order');
  });

  it('deleteOrder throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteOrder('id')).rejects.toThrow('Failed to delete order');
  });
});
