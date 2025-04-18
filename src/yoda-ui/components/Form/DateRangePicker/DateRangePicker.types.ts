import { DateRangePickerProps as MuiDateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange as MuiDateRange } from '@mui/x-date-pickers-pro/models';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type DateRange = MuiDateRange<Date>;

export type DateRangePickerProps = Omit<MuiDateRangePickerProps<Date>,
'value' | 'onChange' | 'slots' | 'slotProps'
> & {
  name: string;
  validation: YodaFieldValidation;
  startRequired?: boolean;
  endRequired?: boolean;
  separator?: string;
  onChange?: (date: DateRange, keyboardInputValue?: string | undefined) => void;
  defaultValue?: DateRange;
  maxDate?: Date;
  minDate?: Date;
  extraErrorMessage?: string;
  disabledStartRange?: boolean;
};
