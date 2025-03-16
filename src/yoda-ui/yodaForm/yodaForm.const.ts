import { YodaField, YodaFieldsState, YodaFormState } from './yodaForm.types';

export const defaultYodaField: YodaField = {
  value: '',
  defaultValue: '',
  isDirty: false,
  isValid: false,
  showError: false,
  errorMessage: null,
  step: null,
  group: null,
  fieldLabel: '',
  validation: null,
};

export const defaultYodaValuesState: YodaFieldsState = {};

export const defaultYodaFormState: YodaFormState = {
  isValid: false,
  isDirty: false,
  showError: false,
};
