/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import DishCard from '../DishCard';
import { Dish, Menu } from 'basics/types/schema.types'; // шлях до deleteDish

jest.mock('lib/api/dishes', () => ({
  deleteDish: jest.fn(() => Promise.resolve()),
}));

jest.mock('imagekitio-next', () => ({
  IKImage: (props: any) => <img { ...props } alt={ props.alt } />,
}));

const dish: Dish = {
  id: '1',
  title: 'Test Dish',
  description: 'Delicious test dish',
  price: 100,
  weight: 250,
  picture: '/image.jpg',
  menu_id: 'menu1',
  isHidden: true,
  createdAt: new Date(),
};

const menus: Menu[] = [
  { id: 'menu1', title: 'Menu 1', type: 'Type 1', createdAt: new Date() },
  { id: 'menu2', title: 'Menu 2', type: 'Type 2', createdAt: new Date() },
];

describe('DishCard', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dish info and image', () => {
    render(<DishCard dish={ dish } onChange={ onChange } menus={ menus } />);

    expect(screen.getByText(dish.title)).toBeInTheDocument();
    expect(screen.getByText(dish.description)).toBeInTheDocument();
    expect(screen.getByText(`Ціна: ${dish.price} грн`)).toBeInTheDocument();
    expect(screen.getByText(`Вага: ${dish.weight} г`)).toBeInTheDocument();

    expect(screen.getByText('Menu 1')).toBeInTheDocument();
    expect(screen.getByText('Приховано')).toBeInTheDocument();

    expect(screen.getByAltText('Dish image')).toBeInTheDocument();
  });

  it('renders "Без меню" if no matching menu found', () => {
    const dishNoMenu = { ...dish, menu_id: 'nonexistent' };
    render(<DishCard dish={ dishNoMenu } onChange={ onChange } menus={ menus } />);
    expect(screen.getByText('Без меню')).toBeInTheDocument();
  });
});
