import { render, screen, fireEvent } from '@testing-library/react';
import AddDishDialog from '../AddDishDialog';
import useAddDishDialog from '../AddDishDialog.hook';
import { Menu } from 'basics/types/schema.types';

jest.mock('../AddDishDialog.hook');

const mockOnAdd = jest.fn();
const mockOnClose = jest.fn();

const menus: Menu[] = [
  { id: '1', title: 'Menu 1', type: 'Type 1', createdAt: new Date() },
  { id: '2', title: 'Menu 2', type: 'Type 2', createdAt: new Date() },
];

describe('AddDishDialog component', () => {
  const mockHookReturn = {
    title: '',
    description: '',
    price: 0,
    weight: 0,
    picture: '',
    isHidden: false,
    menuId: '',
    handleAdd: jest.fn(),
    handleChangeTitle: jest.fn(),
    handleChangeDescription: jest.fn(),
    handleChangePrice: jest.fn(),
    handleChangeWeight: jest.fn(),
    handleChangePicture: jest.fn(),
    handleToggleHidden: jest.fn(),
    handleChangeMenuId: jest.fn(),
  };

  beforeEach(() => {
    (useAddDishDialog as jest.Mock).mockReturnValue(mockHookReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls handlers on input changes', () => {
    render(<AddDishDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } menus={ menus } />);

    fireEvent.change(screen.getByLabelText('Назва'), { target: { value: 'New title' } });
    expect(mockHookReturn.handleChangeTitle).toHaveBeenCalledWith('New title');

    fireEvent.change(screen.getByLabelText('Опис'), { target: { value: 'New description' } });
    expect(mockHookReturn.handleChangeDescription).toHaveBeenCalledWith('New description');

    fireEvent.change(screen.getByLabelText('Ціна'), { target: { value: '123' } });
    expect(mockHookReturn.handleChangePrice).toHaveBeenCalledWith(123);

    fireEvent.change(screen.getByLabelText('Вага (г)'), { target: { value: '456' } });
    expect(mockHookReturn.handleChangeWeight).toHaveBeenCalledWith(456);

    fireEvent.change(screen.getByLabelText('URL зображення'), { target: { value: 'http://image.jpg' } });
    expect(mockHookReturn.handleChangePicture).toHaveBeenCalledWith('http://image.jpg');

    fireEvent.click(screen.getByLabelText('Приховати страву'));
    expect(mockHookReturn.handleToggleHidden).toHaveBeenCalled();
  });

  test('renders dialog with correct title and menu options', () => {
    render(<AddDishDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } menus={ menus } />);

    expect(screen.getByText('Додати страву')).toBeInTheDocument();

    const select = screen.getByLabelText('Меню');
    fireEvent.mouseDown(select);

    menus.forEach((menu) => {
      expect(screen.getByText(menu.title)).toBeInTheDocument();
    });
  });

  test('calls handleAdd and onClose when "Додати" button clicked', () => {
    render(<AddDishDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } menus={ menus } />);
    fireEvent.click(screen.getByText('Додати'));
    expect(mockHookReturn.handleAdd).toHaveBeenCalled();
  });

  test('calls onClose when "Скасувати" button clicked', () => {
    render(<AddDishDialog open={ true } onClose={ mockOnClose } onAdd={ mockOnAdd } menus={ menus } />);
    fireEvent.click(screen.getByText('Скасувати'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
