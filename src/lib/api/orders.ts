import { Order } from 'basics/types/schema.types';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/orders`;

export async function getOrders(): Promise<Order[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get orders');
  }
}

export async function createOrder(tableId: string, waiterId: string): Promise<Order> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ tableId, waiterId }),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create order');
  }
}

export async function updateOrder(id: string, data: unknown): Promise<Order> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update order');
  }
}

export async function deleteOrder(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete order');
  }
}
