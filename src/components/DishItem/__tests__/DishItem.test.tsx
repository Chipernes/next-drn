/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import DishItem from '../DishItem';
import { Dish } from 'basics/types/schema.types';

jest.mock('imagekitio-next', () => ({
  IKImage: (props: any) => <img { ...props } alt={ props.alt } />,
}));

const dishes: Dish[] = [
  {
    id: '1',
    title: 'Pizza Margherita',
    description: 'Classic pizza with tomato sauce and cheese',
    price: 150,
    weight: 300,
    picture: '/pizza1.jpg',
    createdAt: new Date(),
    menu_id: '1',
    isHidden: false,
  },
  {
    id: '2',
    title: 'Pepperoni',
    description: 'Spicy pepperoni with cheese',
    price: 200,
    weight: 350,
    picture: '/pizza2.jpg',
    createdAt: new Date(),
    menu_id: '2',
    isHidden: false,
  },
];

describe('DishItem', () => {
  it('renders title "Піца"', () => {
    render(<DishItem allDishes={ dishes } />);
    expect(screen.getByText('Піца')).toBeInTheDocument();
  });
});

