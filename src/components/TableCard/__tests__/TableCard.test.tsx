import { render, screen } from '@testing-library/react';
import TableCard from '../TableCard';
import * as useTableCardModule from '../TableCard.hook';
import { Table } from 'basics/types/schema.types';

jest.mock('../TableCard.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../EditTableDialog/EditTableDialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (
    open ? <div data-testid="edit-dialog">Edit Dialog Open</div> : null
  ),
}));

const mockTable: Table = {
  id: 'table-1',
  number: 5,
};

const mockOnChange = jest.fn();

const setupHookMock = (overrides = {}) => {
  (useTableCardModule.default as jest.Mock).mockReturnValue({
    openEdit: false,
    handleOpen: jest.fn(),
    handleDelete: jest.fn(),
    ...overrides,
  });
};

describe('TableCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table number correctly', () => {
    setupHookMock();
    render(<TableCard table={ mockTable } onChange={ mockOnChange } />);
    expect(screen.getByText(/Стіл #5/)).toBeInTheDocument();
  });

  it('renders edit dialog when openEdit is true', () => {
    setupHookMock({ openEdit: true });

    render(<TableCard table={ mockTable } onChange={ mockOnChange } />);

    expect(screen.getByTestId('edit-dialog')).toBeInTheDocument();
  });
});
