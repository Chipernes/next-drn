'use client';

import { AutocompleteChangeReason } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react';
import { useYodaForm } from './useYodaForm';
import { SelectOption } from 'basics/options/options.types';
import { DateRange } from 'yoda-ui/components/Form/DateRangePicker/DateRangePicker.types';
import { YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

export type UseYodaFieldProps = {
  name: string;
  defaultValue?: YodaFieldValue;
  maxDate?: Date;
  minDate?: Date;
  onChange?: Function;
  validation?: Function;
};

export const useYodaField = ({ name, defaultValue, onChange, validation }: UseYodaFieldProps) => {
  const yodaMethods = useYodaForm();
  const { fieldsState, useWatchField, setValue, registerField, updateFieldDefaultValue } = yodaMethods;
  const fieldState = useWatchField(name);

  useEffect(() => {
    registerField({ fieldName: name, defaultValue, validation });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, registerField]);

  useEffect(() => {
    const isDefaultValueEqual = isEqual(fieldsState[name]?.defaultValue, defaultValue);
    if (!isDefaultValueEqual) {
      updateFieldDefaultValue({ fieldName: name, defaultValue, validation });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, updateFieldDefaultValue]);

  const onChangeField = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(name, event.target.value);
    if (onChange) {
      onChange(event);
    }
  }, [setValue, name, onChange]);

  const onChangeSlide = useCallback((event: Event, value: number | number[]) => {
    if (fieldsState[name].value !== value) {
      setValue(name, value);
    }

    if (onChange) {
      onChange(event, value);
    }
  }, [fieldsState, name, onChange, setValue]);

  const onChangeFieldSynthetic = useCallback((event: SyntheticEvent<Element, Event>,
    value: string | SelectOption | (SelectOption | string)[] | null, reason: AutocompleteChangeReason) => {
    if (reason === 'createOption') {
      setValue(name, value);
    } else if (value && Array.isArray(value)) {
      const valueToSave = value.map((optionSelected) => (optionSelected as SelectOption).id);
      setValue(name, valueToSave);
    } else {
      const valueToSave = value ? (value as SelectOption).id : '';
      setValue(name, valueToSave);
    }
    if (onChange) {
      onChange(event, value);
    }
  }, [setValue, name, onChange]);

  const onChangeFieldDateOrDateRange = useCallback(<T extends Date | DateRange> (date: T | null) => {
    setValue(name, date);
    if (onChange) {
      onChange(date);
    }
  }, [setValue, onChange, name]);

  const onChangeFieldDate = useCallback((date: Date | null) => onChangeFieldDateOrDateRange<Date>(date), [onChangeFieldDateOrDateRange]);

  const onChangeFieldDateRange = useCallback(
    (date: DateRange | null) => onChangeFieldDateOrDateRange<DateRange>(date),
    [onChangeFieldDateOrDateRange],
  );

  const onSwitchField = useCallback((switchEvent: ChangeEvent<HTMLInputElement>) => {
    const switchChecked = switchEvent.target.checked;
    setValue(name, switchChecked);
    if (onChange) {
      onChange(name, switchChecked);
    }
  }, [setValue, name, onChange]);

  return {
    ...yodaMethods,
    onChangeField,
    onChangeFieldSynthetic,
    onChangeFieldDate,
    onChangeFieldDateRange,
    onChangeSlide,
    onSwitchField,
    fieldValue: fieldState?.value || '',
    fieldDefaultValue: fieldState?.defaultValue,
    fieldShowError: fieldState?.showError && !!fieldState?.errorMessage,
    fieldErrorMessage: fieldState?.showError ? fieldState?.errorMessage : null,
  };
};
