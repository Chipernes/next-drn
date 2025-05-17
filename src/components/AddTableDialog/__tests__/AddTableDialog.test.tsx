/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTableDialog from '../AddTableDialog';

jest.mock('../AddTableDialog.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAddTableDialog = require('../AddTableDialog.hook').default;

describe('AddTableDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddTableDialog.mockReturnValue({
      number: 5,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  it('renders dialog with initial number', () => {
    render(<AddTableDialog open={ true } onClose={ mockOnClose } onCreate={ mockOnCreate } />);

    expect(screen.getByText('Новий стіл')).toBeInTheDocument();
    const input = screen.getByLabelText('Номер') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('5');
  });

  it('calls onClose when "Скасувати" clicked', async () => {
    render(<AddTableDialog open={ true } onClose={ mockOnClose } onCreate={ mockOnCreate } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Скасувати'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls handleSubmit when "Створити" clicked', async () => {
    render(<AddTableDialog open={ true } onClose={ mockOnClose } onCreate={ mockOnCreate } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Створити'));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
