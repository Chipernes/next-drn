import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../employees';
import { Role } from 'basics/enums/schema.enums';
import { Employee } from 'basics/types/schema.types';

global.fetch = jest.fn();

const mockEmployee: Employee = {
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
  role: Role.USER,
  picture: 'avatar.png',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Employee API', () => {
  it('getEmployees returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockEmployee]),
    });

    const result = await getEmployees();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/employees'));
    expect(result).toEqual([mockEmployee]);
  });

  it('createEmployee sends POST and returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockEmployee),
    });

    const data = {
      first_name: 'Jane',
      last_name: 'Smith',
      role: Role.SERVICE,
      picture: 'jane.png',
    };

    const result = await createEmployee(data);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/employees'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(data),
    }));
    expect(result).toEqual(mockEmployee);
  });

  it('updateEmployee sends PUT and returns data', async () => {
    const updated = { first_name: 'Updated' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...mockEmployee, ...updated }),
    });

    const result = await updateEmployee('1', updated);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/employees/1'), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(updated),
    }));
    expect(result.first_name).toBe('Updated');
  });

  it('deleteEmployee sends DELETE', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteEmployee('1');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/employees/1'), expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('getEmployees throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getEmployees()).rejects.toThrow('Failed to get employees');
  });

  it('createEmployee throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createEmployee({ first_name: '', last_name: '', role: Role.ADMINISTRATION })).rejects.toThrow('Failed to create employee');
  });

  it('updateEmployee throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateEmployee('1', {})).rejects.toThrow('Failed to update employee');
  });

  it('deleteEmployee throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteEmployee('1')).rejects.toThrow('Failed to delete employee');
  });
});
