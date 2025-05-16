import { Employee } from 'basics/types/schema.types';

export type EmployeeCardPropsType = {
  employee: Employee;
  onChange: () => void;
};
