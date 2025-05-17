/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeesPage from '../page';

const mockSetOpenAdd = jest.fn();
const mockGetAllEmployees = jest.fn();

jest.mock('../AdminEmployees.hook', () => ({
  __esModule: true,
  default: () => ({
    employees: [
      { id: '1', name: 'Іван Іванов', role: 'WAITER' },
      { id: '2', name: 'Марія Петренко', role: 'COOK' },
    ],
    openAdd: false,
    setOpenAdd: mockSetOpenAdd,
    getAllEmployees: mockGetAllEmployees,
  }),
}));

jest.mock('components/AddEmployeeDialog/AddEmployeeDialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (open ? <div>Mocked AddEmployeeDialog Open</div> : null),
}));

jest.mock('components/EmployeeCard/EmployeeCard', () => ({
  __esModule: true,
  default: ({ employee }: { employee: any }) => (
    <div>{ employee.name }</div>
  ),
}));

describe('EmployeesPage', () => {
  it('renders page title and employees', () => {
    render(<EmployeesPage />);

    expect(screen.getByText('Співробітники')).toBeInTheDocument();
    expect(screen.getByText('Іван Іванов')).toBeInTheDocument();
    expect(screen.getByText('Марія Петренко')).toBeInTheDocument();
  });

  it('calls setOpenAdd(true) on button click', () => {
    render(<EmployeesPage />);

    const button = screen.getByRole('button', { name: 'Додати працівника' });
    fireEvent.click(button);

    expect(mockSetOpenAdd).toHaveBeenCalledWith(true);
  });
});
