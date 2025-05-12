import { OrderDish } from 'basics/types/schema.types';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/orderDishes`;

export async function getOrderDishes(): Promise<OrderDish[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get order dishes');
  }
}

export async function createOrderDish(data: unknown): Promise<OrderDish> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create order dish');
  }
}

export async function updateOrderDish(id: string, data: unknown): Promise<OrderDish> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update order dish');
  }
}

export async function deleteOrderDish(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete order dish');
  }
}
