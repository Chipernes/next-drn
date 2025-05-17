import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditDishDialog from '../EditDishDialog';
import { Dish, Menu } from 'basics/types/schema.types';

import { updateDish } from 'lib/api/dishes';

jest.mock('lib/api/dishes', () => ({
  updateDish: jest.fn(),
}));

const mockDish: Dish = {
  id: '1',
  title: 'Pizza Margherita',
  description: 'Classic pizza',
  price: 150,
  weight: 300,
  picture: 'http://image.url',
  isHidden: false,
  menu_id: 'menu1',
  createdAt: new Date(),
};

const mockMenus: Menu[] = [
  { id: 'menu1', title: 'Main Menu', type: 'Type 1', createdAt: new Date() },
  { id: 'menu2', title: 'Drinks', type: 'Type 2', createdAt: new Date() },
];

describe('EditDishDialog', () => {
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields with initial values', () => {
    render(
      <EditDishDialog
        open={ true }
        onClose={ onClose }
        dish={ mockDish }
        onUpdate={ onUpdate }
        menus={ mockMenus }
      />,
    );

    expect(screen.getByLabelText(/Назва/i)).toHaveValue('Pizza Margherita');
    expect(screen.getByLabelText(/Опис/i)).toHaveValue('Classic pizza');
    expect(screen.getByLabelText(/Ціна/i)).toHaveValue(150);
    expect(screen.getByLabelText(/Вага/i)).toHaveValue(300);
    expect(screen.getByLabelText(/URL зображення/i)).toHaveValue('http://image.url');
    expect(screen.getByLabelText(/Приховати страву/i)).not.toBeChecked();
  });

  it('updates input fields on change', () => {
    render(
      <EditDishDialog
        open={ true }
        onClose={ onClose }
        dish={ mockDish }
        onUpdate={ onUpdate }
        menus={ mockMenus }
      />,
    );

    fireEvent.change(screen.getByLabelText(/Назва/i), { target: { value: 'New Pizza' } });
    fireEvent.change(screen.getByLabelText(/Опис/i), { target: { value: 'New description' } });
    fireEvent.change(screen.getByLabelText(/Ціна/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/Вага/i), { target: { value: '400' } });
    fireEvent.change(screen.getByLabelText(/URL зображення/i), { target: { value: 'http://new.url' } });
    fireEvent.click(screen.getByLabelText(/Приховати страву/i));

    expect(screen.getByLabelText(/Назва/i)).toHaveValue('New Pizza');
    expect(screen.getByLabelText(/Опис/i)).toHaveValue('New description');
    expect(screen.getByLabelText(/Ціна/i)).toHaveValue(200);
    expect(screen.getByLabelText(/Вага/i)).toHaveValue(400);
    expect(screen.getByLabelText(/URL зображення/i)).toHaveValue('http://new.url');
    expect(screen.getByLabelText(/Приховати страву/i)).toBeChecked();
  });

  it('calls onClose when cancel button clicked', () => {
    render(
      <EditDishDialog
        open={ true }
        onClose={ onClose }
        dish={ mockDish }
        onUpdate={ onUpdate }
        menus={ mockMenus }
      />,
    );

    fireEvent.click(screen.getByText(/Скасувати/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls updateDish, onUpdate and onClose on save', async () => {
    render(
      <EditDishDialog
        open={ true }
        onClose={ onClose }
        dish={ mockDish }
        onUpdate={ onUpdate }
        menus={ mockMenus }
      />,
    );

    fireEvent.click(screen.getByText(/Зберегти/i));

    await waitFor(() => {
      expect(updateDish).toHaveBeenCalledWith(mockDish.id, {
        title: mockDish.title,
        description: mockDish.description,
        price: mockDish.price,
        weight: mockDish.weight,
        picture: mockDish.picture,
        isHidden: mockDish.isHidden,
        menu_id: mockDish.menu_id,
      });
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('disables save button if no menu selected', () => {
    render(
      <EditDishDialog
        open={ true }
        onClose={ onClose }
        dish={ { ...mockDish, menu_id: '' } }
        onUpdate={ onUpdate }
        menus={ mockMenus }
      />,
    );

    expect(screen.getByText(/Зберегти/i)).toBeDisabled();
  });
});
