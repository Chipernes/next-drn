import { SelectOption } from 'basics/options/options.types';
import { YodaFieldValidation, YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

export enum SortType {
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export type SelectYodaInputProps = {
  label: string;
  name: string;
  options: SelectOption[];
  value?: SelectOption;
  freeOption?: boolean;
  freeDefaultValue?: boolean;
  defaultValue?: YodaFieldValue;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: Function;
  disableClearable?: boolean;
  validation?: YodaFieldValidation;
  maxHeight?: number;
  overflow?: string;
  loading?: boolean;
  loadingText?: string;
  clearOption?: boolean;
  sortType?: SortType;
};
