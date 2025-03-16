import { YodaFieldValidation, YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

export type SelectAsyncYodaInputProps = {
  defaultValue?: YodaFieldValue;
  disableClearable?: boolean;
  disabled?: boolean;
  label: string;
  lazyQueryHook: Function;
  messageEmpty?: string;
  messageInitial?: string;
  minQueryLength?: number;
  messageLoading?: string;
  name: string;
  onChange?: Function;
  onInputChange?: Function;
  placeholder?: string;
  required?: boolean;
  validation?: YodaFieldValidation;
};
