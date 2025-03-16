import { DateRangePickerProps as MuiDateRangePickerProps } from '@mui/lab/DateRangePicker';
import { DateRange as MuiDateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { ReactElement } from 'react';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type DateRange = MuiDateRange<Date>;

export type DateRangePickerProps = Omit<MuiDateRangePickerProps<Date>,
'value' | 'onChange' | 'renderInput'> & {
  name: string;
  validation: YodaFieldValidation;
  startRequired?: boolean;
  endRequired?: boolean;
  separator?: string;
  onChange?: (date: DateRange, keyboardInputValue?: string | undefined) => void;
  renderInput?: (startProps: unknown, endProps: unknown) => ReactElement;
  defaultValue?: DateRange;
  maxDate?: Date;
  minDate?: Date;
  extraErrorMessage?: string;
  disabledStartRange?: boolean;
};
