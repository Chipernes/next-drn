import {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from '../dishes';
import type { Dish } from 'basics/types/schema.types';

const mockDishes: Dish[] = [
  {
    id: '1',
    menu_id: 'menu1',
    title: 'Dish 1',
    description: 'Tasty dish',
    price: 100,
    weight: 400,
    picture: 'pic1.jpg',
    isHidden: false,
    createdAt: new Date('2025-01-01'),
  },
];

describe('API functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getDishes returns dishes on success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockDishes),
    });

    const data = await getDishes();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dishes'));
    expect(data).toEqual(mockDishes);
  });

  test('getDishes throws error on failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getDishes()).rejects.toThrow('Failed to get dishes');
  });

  test('getDishById returns dish on success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([mockDishes[0]]),
    });

    const data = await getDishById('1');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dishes/1'));
    expect(data).toEqual(mockDishes);
  });

  test('getDishById throws error on failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(getDishById('1')).rejects.toThrow('Failed to get dish');
  });

  test('createDish posts data and returns created dish', async () => {
    const newDish = { ...mockDishes[0], id: undefined, createdAt: undefined };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockDishes[0]),
    });

    const data = await createDish(newDish);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dishes'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(newDish),
    }));
    expect(data).toEqual(mockDishes[0]);
  });

  test('createDish throws error on failure', async () => {
    const mockDishData: Omit<Dish, 'id' | 'createdAt'> = {
      title: 'a',
      menu_id: 'menu-1',
      description: 'desc',
      price: 15,
      weight: 250,
      isHidden: true,
      picture: 'pic.jpg',
    };
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(createDish(mockDishData)).rejects.toThrow('Failed to create dish');
  });

  test('updateDish puts data and returns updated dish', async () => {
    const updatedData = { title: 'Updated' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockDishes[0]),
    });

    const data = await updateDish('1', updatedData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dishes/1'), expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify(updatedData),
    }));
    expect(data).toEqual(mockDishes[0]);
  });

  test('updateDish throws error on failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(updateDish('1', {})).rejects.toThrow('Failed to update dish');
  });

  test('deleteDish calls fetch with DELETE method', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await deleteDish('1');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dishes/1'), expect.objectContaining({
      method: 'DELETE',
      body: JSON.stringify('1'),
    }));
  });

  test('deleteDish throws error on failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await expect(deleteDish('1')).rejects.toThrow('Failed to delete dish');
  });
});
