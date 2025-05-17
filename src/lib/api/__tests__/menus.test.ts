import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} from '../menus';
import { Menu } from 'basics/types/schema.types';

global.fetch = jest.fn();

const mockMenu: Menu = {
  id: 'menu-1',
  title: 'Summer Specials',
  type: 'seasonal',
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Menu API', () => {
  it('getMenus returns data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockMenu]),
    });

    const result = await getMenus();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/menus'));
    expect(result).toEqual([mockMenu]);
  });

  it('createMenu sends POST and returns data', async () => {
    const data = {
      title: 'Winter Menu',
      type: 'seasonal',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...data, id: 'menu-2', createdAt: new Date() }),
    });

    const result = await createMenu(data);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/menus'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(data),
    }));
    expect(result.title).toBe(data.title);
  });

  it('updateMenu sends PATCH and returns data', async () => {
    const patch = { title: 'Updated Title' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ ...mockMenu, ...patch }),
    });

    const result = await updateMenu(mockMenu.id, patch);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/menus/${mockMenu.id}`), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(patch),
    }));
    expect(result.title).toBe(patch.title);
  });

  it('deleteMenu sends DELETE', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteMenu(mockMenu.id);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/menus/${mockMenu.id}`), expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('getMenus throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getMenus()).rejects.toThrow('Failed to get menus');
  });

  it('createMenu throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createMenu({ title: 'x', type: 'y' })).rejects.toThrow('Failed to create menu');
  });

  it('updateMenu throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateMenu('menu-1', { title: 'x' })).rejects.toThrow('Failed to update menu');
  });

  it('deleteMenu throws on error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteMenu('menu-1')).rejects.toThrow('Failed to delete menu');
  });
});
