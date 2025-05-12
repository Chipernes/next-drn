import { Dish } from 'basics/types/schema.types';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishes`;

export async function getDishes(): Promise<Dish[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get dishes');
  }
}

export async function createDish(data: Omit<Dish, 'id' | 'createdAt'>): Promise<Dish> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create dish');
  }
}

export async function updateDish(id: string, data: unknown): Promise<Dish> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update dish');
  }
}

export async function deleteDish(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(id),
    });
  } catch {
    throw new Error('Failed to delete dish');
  }
}
