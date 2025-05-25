import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from '../tables';
import { Table } from 'basics/types/schema.types';

global.fetch = jest.fn();

const mockTable: Table = {
  id: 'table-1',
  number: 5,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Table API', () => {
  it('getTables returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockTable]),
    });

    const result = await getTables();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/tables'));
    expect(result).toEqual([mockTable]);
  });

  it('createTable sends POST and returns table', async () => {
    const newTable = { number: 6 };
    const mockCreated = { id: 'table-2', ...newTable };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCreated),
    });

    const result = await createTable(newTable);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/tables'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(newTable),
    }));
    expect(result).toEqual(mockCreated);
  });

  it('updateTable sends PUT and returns updated table', async () => {
    const update = { number: 7 };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...mockTable, ...update }),
    });

    const result = await updateTable(mockTable.id, update);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tables/${mockTable.id}`), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(update),
    }));
    expect(result.number).toBe(7);
  });

  it('deleteTable sends DELETE', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteTable(mockTable.id);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tables/${mockTable.id}`), expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('getTables throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getTables()).rejects.toThrow('Failed to get tables');
  });

  it('createTable throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createTable({ number: 1 })).rejects.toThrow('Failed to create table');
  });

  it('updateTable throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateTable('id', { number: 2 })).rejects.toThrow('Failed to update table');
  });

  it('deleteTable throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteTable('id')).rejects.toThrow('Failed to delete table');
  });
});
