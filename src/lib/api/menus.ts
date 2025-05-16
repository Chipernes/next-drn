import { Menu } from 'basics/types/schema.types';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/menus`;

export async function getMenus(): Promise<Menu[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get menus');
  }
}

export async function createMenu(data: Omit<Menu, 'id' | 'createdAt'>): Promise<Menu> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create menu');
  }
}

export async function updateMenu(id: string, data: Partial<Omit<Menu, 'id' | 'createdAt'>>): Promise<Menu> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update menu');
  }
}

export async function deleteMenu(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete menu');
  }
}
