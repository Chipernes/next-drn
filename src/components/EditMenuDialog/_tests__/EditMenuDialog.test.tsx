import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditMenuDialog from '../EditMenuDialog';
import { Menu } from 'basics/types/schema.types';
import { updateMenu } from 'lib/api/menus';

jest.mock('lib/api/menus', () => ({
  updateMenu: jest.fn(),
}));

const mockMenu: Menu = {
  id: 'menu1',
  title: 'Main Menu',
  type: 'Dinner',
  createdAt: new Date(),
};

describe('EditMenuDialog', () => {
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial values ​​in the fields', () => {
    render(
      <EditMenuDialog
        open={ true }
        onClose={ onClose }
        menu={ mockMenu }
        onUpdate={ onUpdate }
      />,
    );

    expect(screen.getByLabelText(/Назва/i)).toHaveValue('Main Menu');
    expect(screen.getByLabelText(/Тип/i)).toHaveValue('Dinner');
  });

  it('змінює значення полів при вводі', () => {
    render(
      <EditMenuDialog
        open={ true }
        onClose={ onClose }
        menu={ mockMenu }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.change(screen.getByLabelText(/Назва/i), { target: { value: 'Updated Menu' } });
    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'Lunch' } });

    expect(screen.getByLabelText(/Назва/i)).toHaveValue('Updated Menu');
    expect(screen.getByLabelText(/Тип/i)).toHaveValue('Lunch');
  });

  it('calls onClose when the "Cancel" button is clicked', () => {
    render(
      <EditMenuDialog
        open={ true }
        onClose={ onClose }
        menu={ mockMenu }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Скасувати/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls updateMenu, onUpdate and onClose on save', async () => {
    (updateMenu as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EditMenuDialog
        open={ true }
        onClose={ onClose }
        menu={ mockMenu }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Зберегти/i));

    await waitFor(() => {
      expect(updateMenu).toHaveBeenCalledWith(mockMenu.id, {
        title: mockMenu.title,
        type: mockMenu.type,
      });
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
