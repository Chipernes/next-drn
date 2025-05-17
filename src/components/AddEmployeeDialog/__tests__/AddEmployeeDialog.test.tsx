/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEmployeeDialog from '../AddEmployeeDialog';
import { Role } from 'basics/enums/schema.enums';

jest.mock('../AddEmployeeDialog.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAddEmployeeDialog = require('../AddEmployeeDialog.hook').default;

describe('AddEmployeeDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();
  const mockHandleAdd = jest.fn();
  const mockHandleChangeFirstName = jest.fn();
  const mockHandleChangeLastName = jest.fn();
  const mockHandleChangeRole = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddEmployeeDialog.mockReturnValue({
      firstName: 'Іван',
      lastName: 'Іванов',
      role: Role.SERVICE,
      handleAdd: mockHandleAdd,
      handleChangeFirstName: mockHandleChangeFirstName,
      handleChangeLastName: mockHandleChangeLastName,
      handleChangeRole: mockHandleChangeRole,
    });
  });

  it('renders dialog with fields and buttons', () => {
    render(<AddEmployeeDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);

    expect(screen.getByText('Додати співробітника')).toBeInTheDocument();
    expect(screen.getByLabelText('Ім\'я')).toHaveValue('Іван');
    expect(screen.getByLabelText('Прізвище')).toHaveValue('Іванов');
    expect(screen.getByRole('combobox', { name: /роль/i })).toHaveTextContent('Офіціант');
    expect(screen.getByText('Скасувати')).toBeInTheDocument();
    expect(screen.getByText('Додати')).toBeInTheDocument();
  });

  it('calls handleAdd when Додати clicked', async () => {
    render(<AddEmployeeDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Додати'));
    expect(mockHandleAdd).toHaveBeenCalled();
  });

  it('calls onClose when Скасувати clicked', async () => {
    render(<AddEmployeeDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Скасувати'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
