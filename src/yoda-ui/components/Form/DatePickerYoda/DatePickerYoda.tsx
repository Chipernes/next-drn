import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC } from 'react';
import { useYodaField } from 'yoda-ui/yodaForm';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type DatePickerYodaInputProps = {
  name: string;
  label: string;
  defaultValue?: Date;
  onChange?: (date: Date | null, keyboardInputValue?: string) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  validation?: YodaFieldValidation;
};

const DatePickerYoda: FC<DatePickerYodaInputProps> = ({
  disabled,
  label,
  onChange,
  minDate,
  maxDate,
  defaultValue,
  name,
  validation,
  required,
}) => {
  const { onChangeFieldDate, fieldValue, fieldShowError, fieldErrorMessage } = useYodaField({
    name,
    defaultValue,
    onChange,
    validation,
  });

  return (
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <DatePicker
        disabled={ disabled }
        format="dd.MM.yyyy"
        onChange={ onChangeFieldDate }
        label={ label }
        value={ fieldValue as Date }
        minDate={ minDate }
        maxDate={ maxDate }
        views={ ['year', 'month', 'day'] }
        slotProps={
          {
            textField: {
              required,
              error: fieldShowError,
              helperText: fieldShowError ? fieldErrorMessage : undefined,
            },
          }
        }
      />
    </LocalizationProvider>
  );
};

export default DatePickerYoda;
