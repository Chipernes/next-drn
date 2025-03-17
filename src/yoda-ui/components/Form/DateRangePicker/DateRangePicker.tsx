/* eslint-disable import/no-cycle */
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { FC } from 'react';
import ClearButton from './ClearButton';
import useDateRangePicker from './DateRangePicker.hook';
import { dateRangePickerStyles } from './DateRangePicker.styles';
import { DateRange, DateRangePickerProps } from './DateRangePicker.types';
import Box from 'yoda-ui/components/Box';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import TextField from 'yoda-ui/components/Form/TextField';

const CustomDateRangePicker: FC<DateRangePickerProps> = ({
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
      <DateRangePicker
        value={ fieldValue || [null, null] as DateRange }
        onClose={ hideCalendar }
        open={ calendarOpen }
        onChange={ (range) => handleChange(!disabledStartRange ? range : [fieldValue?.[0], range[1] || fieldValue?.[1]]) }
        disabled={ disabled }
        shouldDisableDate={ shouldDisableDate }
        calendars={ 2 }
        slots={
          {
            textField: (params) => (
              <>
                <TextField
                  { ...params.startProps }
                  sx={ dateRangePickerStyles.textField }
                  helperText={ null }
                  required={ startRequired }
                  error={ fieldShowError }
                  onClick={ !disabledStartRange ? showCalendar : undefined }
                  disabled={ disabled || disabledStartRange }
                  inputProps={
                    {
                      ...params.startProps.inputProps,
                      readOnly: disabled || disabledStartRange,
                    }
                  }
                />
                <Box sx={ dateRangePickerStyles.box }>{ separator }</Box>
                <TextField
                  { ...params.endProps }
                  sx={ dateRangePickerStyles.textField }
                  helperText={ null }
                  required={ endRequired }
                  error={ fieldShowError }
                  onClick={ showCalendar }
                  disabled={ disabled }
                  InputProps={
                    {
                      endAdornment:
                    disabled || disabledStartRange ? null : (
                      <ClearButton onClick={ handleClearButtonClick } disabled={ clearButtonDisabled } />
                    ),
                    }
                  }
                />
              </>
            ),
          }
        }
        { ...props }
      />
      { fieldShowError && <FormHelperText error>{ fieldErrorMessage }</FormHelperText> }
      { extraErrorMessage && <FormHelperText error>{ extraErrorMessage }</FormHelperText> }
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
