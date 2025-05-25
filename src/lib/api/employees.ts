import { Employee } from 'basics/types/schema.types';
import { config } from 'config/config';

const BASE_URL = `${config.env.apiEndpoint}/api/employees`;

export async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch {
    throw new Error('Failed to get employees');
  }
}

export async function createEmployee(data: Omit<Employee, 'id'>): Promise<Employee> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to create employee');
  }
}

export async function updateEmployee(id: string, data: Partial<Omit<Employee, 'id'>>): Promise<Employee> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    throw new Error('Failed to update employee');
  }
}

export async function deleteEmployee(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Failed to delete employee');
  }
}
