import { SelectOption } from 'basics/options/options.types';
import { YodaFieldValidation, YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

export type MultiSelectYodaInputProps = {
  defaultValue?: YodaFieldValue[];
  disableClearable?: boolean;
  disabled?: boolean;
  label: string;
  freeOption?: boolean;
  name: string;
  onChange?: Function;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  validation?: YodaFieldValidation;
  enableSelectAll?: boolean;
};
