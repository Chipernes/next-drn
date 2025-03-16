import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FC } from 'react';
import { datePickerStyle } from 'yoda-ui/components/Form/DatePickerYoda/DatePicker.styles';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import TextField from 'yoda-ui/components/Form/TextField';
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

const DatePickerYoda: FC<DatePickerYodaInputProps> = ({ disabled,
  label,
  onChange,
  minDate,
  maxDate,
  defaultValue,
  name,
  validation,
  required }) => {
  const { onChangeFieldDate,
    fieldValue,
    fieldShowError,
    fieldErrorMessage } = useYodaField({ name, defaultValue, onChange, validation });

  return (

    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <MuiDatePicker<Date>
        disabled={ disabled }
        mask="__.__.____"
        inputFormat="dd.MM.yyyy"
        onChange={ onChangeFieldDate }
        label={ label }
        value={ fieldValue as Date }
        minDate={ minDate }
        maxDate={ maxDate }
        views={ ['year', 'month', 'day'] }
        renderInput={
          (params) => (
            <TextField
              { ...params }
              sx={ datePickerStyle.textField }
              helperText={ null }
              required={ required }
              error={ fieldShowError }
            />
          )
        }
      />
      { fieldShowError && <FormHelperText error>{ fieldErrorMessage }</FormHelperText> }
    </LocalizationProvider>
  );
};

export default DatePickerYoda;
