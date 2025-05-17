import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EmployeeCard from '../EmployeeCard';
import { Role } from 'basics/enums/schema.enums';
import { Employee } from 'basics/types/schema.types';

import { deleteEmployee } from 'lib/api/employees';

jest.mock('lib/api/employees', () => ({
  deleteEmployee: jest.fn(),
}));

const mockEmployee: Employee = {
  id: 'emp1',
  first_name: 'John',
  last_name: 'Doe',
  role: Role.SERVICE,
  picture: 'http://avatar.url',
};

describe('Employee card', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders employee information', () => {
    render(<EmployeeCard employee={ mockEmployee } onChange={ onChange } />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/SERVICE/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /John Doe/i })).toHaveAttribute('src', mockEmployee.picture);
  });

  it('opens the edit dialog when clicking on the edit icon', () => {
    render(<EmployeeCard employee={ mockEmployee } onChange={ onChange } />);

    fireEvent.click(screen.getByLabelText(/Редагувати/i));

    expect(screen.getByText(/Редагувати співробітника/i)).toBeInTheDocument();
  });

  it('closes the edit dialog on close', () => {
    render(<EmployeeCard employee={ mockEmployee } onChange={ onChange } />);

    fireEvent.click(screen.getByLabelText(/Редагувати/i));
    expect(screen.getByText(/Редагувати співробітника/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Скасувати/i));
    waitFor(() => {
      expect(screen.queryByText(/Редагувати співробітника/i)).not.toBeInTheDocument();
    });
  });

  it('calls deleteEmployee and onChange when delete is clicked', async () => {
    (deleteEmployee as jest.Mock).mockResolvedValueOnce(undefined);

    render(<EmployeeCard employee={ mockEmployee } onChange={ onChange } />);

    fireEvent.click(screen.getByLabelText(/Видалити/i));

    await waitFor(() => {
      expect(deleteEmployee).toHaveBeenCalledWith(mockEmployee.id);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
