import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditEmployeeDialog from '../EditEmployeeDialog';
import { Role } from 'basics/enums/schema.enums';
import { Employee } from 'basics/types/schema.types';

import { updateEmployee } from 'lib/api/employees';

jest.mock('lib/api/employees', () => ({
  updateEmployee: jest.fn(),
}));

const mockEmployee: Employee = {
  id: 'emp1',
  first_name: 'John',
  last_name: 'Doe',
  role: Role.SERVICE,
};

describe('EditEmployeeDialog', () => {
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерить початкові значення у полях', () => {
    render(
      <EditEmployeeDialog
        open={ true }
        onClose={ onClose }
        employee={ mockEmployee }
        onUpdate={ onUpdate }
      />,
    );

    expect(screen.getByLabelText(/Ім'я/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Прізвище/i)).toHaveValue('Doe');
  });

  it('змінює значення полів при вводі', () => {
    render(
      <EditEmployeeDialog
        open={ true }
        onClose={ onClose }
        employee={ mockEmployee }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.change(screen.getByLabelText(/Ім'я/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Прізвище/i), { target: { value: 'Smith' } });

    expect(screen.getByLabelText(/Ім'я/i)).toHaveValue('Jane');
    expect(screen.getByLabelText(/Прізвище/i)).toHaveValue('Smith');
  });

  it('викликає onClose при натисканні кнопки "Скасувати"', () => {
    render(
      <EditEmployeeDialog
        open={ true }
        onClose={ onClose }
        employee={ mockEmployee }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Скасувати/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('викликає updateEmployee, onUpdate та onClose при збереженні', async () => {
    (updateEmployee as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EditEmployeeDialog
        open={ true }
        onClose={ onClose }
        employee={ mockEmployee }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Зберегти/i));

    await waitFor(() => {
      expect(updateEmployee).toHaveBeenCalledWith(mockEmployee.id, {
        first_name: mockEmployee.first_name,
        last_name: mockEmployee.last_name,
        role: mockEmployee.role,
      });
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
