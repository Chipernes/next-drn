/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminMenuPage from '../page';

const mockSetOpenAddDialog = jest.fn();
const mockHandleReload = jest.fn();

jest.mock('../AdminMenu.hook', () => ({
  __esModule: true,
  default: () => ({
    menus: [
      { id: '1', name: 'Основне меню' },
      { id: '2', name: 'Дитяче меню' },
    ],
    handleReload: mockHandleReload,
    openAddDialog: false,
    setOpenAddDialog: mockSetOpenAddDialog,
  }),
}));

jest.mock('components/AddMenuDialog/AddMenuDialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (open ? <div>Mocked AddMenuDialog Open</div> : null),
}));

jest.mock('components/MenuCard/MenuCard', () => ({
  __esModule: true,
  default: ({ menu }: { menu: any }) => <div>{ menu.name }</div>,
}));

describe('AdminMenuPage', () => {
  it('renders page title and menus', () => {
    render(<AdminMenuPage />);

    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Основне меню')).toBeInTheDocument();
    expect(screen.getByText('Дитяче меню')).toBeInTheDocument();
  });

  it('calls setOpenAddDialog(true) on button click', () => {
    render(<AdminMenuPage />);

    const button = screen.getByRole('button', { name: 'Додати меню' });
    fireEvent.click(button);

    expect(mockSetOpenAddDialog).toHaveBeenCalledWith(true);
  });
});
