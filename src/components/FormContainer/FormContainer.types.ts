import { ReactNode } from 'react';
import { ActionButtonProps } from 'components/ActionButton/ActionButton';
import { YodaContextValue } from 'yoda-ui/yodaForm/yodaForm.types';

export type FormContainerTypes = {
  providerFields: YodaContextValue;
  cancelButtonConfig?: ActionButtonProps;
  submitButtonConfig?: ActionButtonProps;
  exportDataButtonConfig?: ActionButtonProps;
  children: ReactNode;
};
