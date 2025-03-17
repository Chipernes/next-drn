/* eslint-disable import/no-cycle */
import { isAfter, isBefore, subDays } from 'date-fns';
import { MouseEventHandler, useCallback, useState, useMemo } from 'react';
import { DateRange } from './DateRangePicker.types';
import { useYodaField, UseYodaFieldProps } from 'yoda-ui/yodaForm/hooks/useYodaField';

const useDateRangePicker = ({ name, minDate, maxDate, ...props }: UseYodaFieldProps) => {
  const {
    onChangeFieldDateRange,
    fieldValue,
    fieldShowError,
    fieldErrorMessage,
    setFormIsDirty,
  } = useYodaField({ name, ...props });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const hideCalendar = useCallback(() => setCalendarOpen(false), []);
  const showCalendar = useCallback(() => setCalendarOpen(true), []);

  const handleChange = useCallback((date: DateRange | null) => {
    if (date === null || date[0] === null) {
      return;
    }
    onChangeFieldDateRange(date);
    setFormIsDirty(true);
  }, [onChangeFieldDateRange, setFormIsDirty]);

  const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    if (fieldValue && fieldValue.length > 0) {
      onChangeFieldDateRange([null, null]);
    }
  }, [fieldValue, onChangeFieldDateRange]);

  const shouldDisableDate = (date: Date) => {
    if (minDate && maxDate) {
      return isBefore(date, subDays(minDate, 1)) || isAfter(date, maxDate);
    }

    if (minDate) {
      return isBefore(date, subDays(minDate, 1));
    }

    if (maxDate) {
      return isAfter(date, maxDate);
    }

    return false;
  };

  const clearButtonDisabled = useMemo(() => (!fieldValue || fieldValue.length <= 1 || fieldValue[1] == null), [fieldValue]);

  return {
    fieldValue,
    fieldShowError,
    fieldErrorMessage,
    calendarOpen,
    hideCalendar,
    showCalendar,
    handleChange,
    handleClearButtonClick,
    clearButtonDisabled,
    shouldDisableDate,
  };
};

export default useDateRangePicker;
