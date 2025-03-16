import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiDateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FC } from 'react';
import ClearButton from './ClearButton';
import useDateRangePicker from './DateRangePicker.hook';
import { dateRangePickerStyles } from './DateRangePicker.styles';
import { DateRange, DateRangePickerProps } from './DateRangePicker.types';
import Box from 'yoda-ui/components/Box';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import TextField from 'yoda-ui/components/Form/TextField';

const DateRangePicker: FC<DateRangePickerProps> = ({
  name,
  validation,
  onChange,
  startRequired,
  endRequired,
  separator = '',
  defaultValue,
  disabled,
  maxDate,
  minDate,
  extraErrorMessage,
  disabledStartRange,
  ...props
}) => {
  const {
    handleChange,
    fieldValue,
    fieldShowError,
    calendarOpen,
    hideCalendar,
    showCalendar,
    fieldErrorMessage,
    handleClearButtonClick,
    clearButtonDisabled,
    shouldDisableDate,
  } = useDateRangePicker({ name, validation, onChange, defaultValue, maxDate, minDate });

  return (
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <MuiDateRangePicker
        inputFormat="dd.MM.yyyy"
        mask="__.__.____"
        onClose={ () => hideCalendar() }
        onChange={ (range) => handleChange(!disabledStartRange ? range : [fieldValue?.[0], range[1] || fieldValue?.[1]]) }
        value={ fieldValue || [null, null] as DateRange }
        open={ calendarOpen }
        disabled={ disabled }
        shouldDisableDate={ shouldDisableDate }
        renderInput={
          (startProps, endProps) => (
            <>
              <TextField
                { ...startProps }
                sx={ dateRangePickerStyles.textField }
                helperText={ null }
                required={ startRequired }
                error={ fieldShowError }
                onClick={ !disabledStartRange ? showCalendar : undefined }
                disabled={ disabled || disabledStartRange }
                inputProps={
                  {
                    ...startProps.inputProps,
                    readOnly: disabled || disabledStartRange,
                  }
                }
              />
              <Box sx={ dateRangePickerStyles.box }>{ separator }</Box>
              <TextField
                { ...endProps }
                sx={ dateRangePickerStyles.textField }
                helperText={ null }
                required={ endRequired }
                error={ fieldShowError }
                onClick={ showCalendar }
                disabled={ disabled }
                InputProps={
                  {
                    endAdornment: disabled || disabledStartRange
                      ? null
                      : <ClearButton onClick={ handleClearButtonClick } disabled={ clearButtonDisabled } />,
                  }
                }
              />
            </>
          )
        }
        { ...props }
      />
      { fieldShowError && <FormHelperText error>{ fieldErrorMessage }</FormHelperText> }
      { extraErrorMessage && <FormHelperText error>{ extraErrorMessage }</FormHelperText> }
    </LocalizationProvider>
  );
};

export default DateRangePicker;
