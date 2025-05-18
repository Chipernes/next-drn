/* eslint-disable react/display-name */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHomePage from '../page';

jest.mock('../administration.config', () => ({
  __esModule: true,
  default: () => ([
    {
      title: 'Аналітика',
      description: 'Переглянути статистику та діаграми по замовленням',
      href: '/administration/dashboard',
      imageUrl: '/administration/dashboard.jpg',
    },
    {
      title: 'Меню',
      description: 'Керування стравами, меню та їх відображенням',
      href: '/administration/menu',
      imageUrl: '/administration/menu.jpg',
    },
    {
      title: 'Співробітники',
      description: 'Додавання, редагування та видалення персоналу',
      href: '/administration/employees',
      imageUrl: '/administration/employees.jpg',
    },
    {
      title: 'Столи',
      description: 'Редагування та створення столів у залі',
      href: '/administration/tables',
      imageUrl: '/administration/tables.jpg',
    },
  ]),
}));

jest.mock('components/AdminHomeCard/AdminHomeCard', () => ({ title }: { title: string }) => (
  <div>{ title }</div>
));

describe('AdminHomePage', () => {
  it('renders page title', () => {
    render(<AdminHomePage />);
    expect(screen.getByText('Панель адміністратора')).toBeInTheDocument();
  });

  it('renders all cards', () => {
    render(<AdminHomePage />);
    expect(screen.getByText('Аналітика')).toBeInTheDocument();
    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Співробітники')).toBeInTheDocument();
    expect(screen.getByText('Столи')).toBeInTheDocument();
  });
});
