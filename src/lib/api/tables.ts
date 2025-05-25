import { Table } from 'basics/types/schema.types';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/tables`;

export async function getTables(): Promise<Table[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get tables');
  }
}

export async function createTable(data: Omit<Table, 'id'>): Promise<Table> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create table');
  }
}

export async function updateTable(id: string, data: Partial<Omit<Table, 'id'>>): Promise<Table> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update table');
  }
}

export async function deleteTable(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete table');
  }
}
