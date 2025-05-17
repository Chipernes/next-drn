/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMenuDialog from '../AddMenuDialog';

jest.mock('../AddMenuDialog.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAddMenuDialog = require('../AddMenuDialog.hook').default;

describe('AddMenuDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();
  const mockHandleAdd = jest.fn();
  const mockHandleChangeTitle = jest.fn();
  const mockHandleChangeType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    let title = 'Сніданки';
    let type = 'Основне';

    const updateHook = () => {
      mockUseAddMenuDialog.mockReturnValue({
        title,
        type,
        handleAdd: mockHandleAdd,
        handleChangeTitle: (val: string) => {
          title = val;
          mockHandleChangeTitle(val);
          updateHook();
        },
        handleChangeType: (val: string) => {
          type = val;
          mockHandleChangeType(val);
          updateHook();
        },
      });
    };

    updateHook();
  });

  it('renders dialog with input fields', () => {
    render(<AddMenuDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);
    expect(screen.getByText('Додати меню')).toBeInTheDocument();
    expect(screen.getByLabelText('Назва')).toHaveValue('Сніданки');
    expect(screen.getByLabelText('Тип')).toHaveValue('Основне');
  });

  it('calls handleAdd when Додати clicked', async () => {
    render(<AddMenuDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Додати'));
    expect(mockHandleAdd).toHaveBeenCalled();
  });

  it('calls onClose when Скасувати clicked', async () => {
    render(<AddMenuDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Скасувати'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
