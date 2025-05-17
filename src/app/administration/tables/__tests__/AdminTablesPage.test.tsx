/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminTablesPage from '../page';

const mockSetOpenAdd = jest.fn();
const mockGetAllTables = jest.fn();

jest.mock('../AdminTables.hook', () => ({
  __esModule: true,
  default: () => ({
    tables: [
      { id: '1', name: 'Стіл 1', seats: 4 },
      { id: '2', name: 'Стіл 2', seats: 2 },
    ],
    openAdd: false,
    setOpenAdd: mockSetOpenAdd,
    getAllTables: mockGetAllTables,
  }),
}));

jest.mock('components/AddTableDialog/AddTableDialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (open ? <div>Mocked AddTableDialog Open</div> : null),
}));

jest.mock('components/TableCard/TableCard', () => ({
  __esModule: true,
  default: ({ table }: { table: any }) => <div>{ table.name }</div>,
}));

describe('AdminTablesPage', () => {
  it('renders page title and tables', () => {
    render(<AdminTablesPage />);

    expect(screen.getByText('Столи')).toBeInTheDocument();
    expect(screen.getByText('Стіл 1')).toBeInTheDocument();
    expect(screen.getByText('Стіл 2')).toBeInTheDocument();
  });

  it('opens AddTableDialog on button click', () => {
    render(<AdminTablesPage />);

    const button = screen.getByRole('button', { name: 'Додати стіл' });
    fireEvent.click(button);

    expect(mockSetOpenAdd).toHaveBeenCalledWith(true);
  });
});
