import { Employee } from 'basics/types/schema.types';

export type EditEmployeeDialogPropsType = {
  open: boolean;
  onClose: () => void;
  employee: Employee;
  onUpdate: () => void;
};
