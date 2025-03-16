import { AutocompleteChangeReason } from '@mui/material';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { MultiSelectIdsType, SelectOption } from 'basics/options/options.types';
import { findMultipleOptionsByIds } from 'yoda-ui/utils/options.utils';
import { useYodaField } from 'yoda-ui/yodaForm';
import { YodaFieldValidation, YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

const useMultiSelectYoda = (
  name: string,
  defaultValue: YodaFieldValue[] | undefined,
  onChange: Function | undefined,
  validation: YodaFieldValidation,
  options: SelectOption[],
  freeOption: boolean,
  enableSelectAll: boolean,
) => {
  const {
    onChangeFieldSynthetic,
    fieldValue,
    fieldDefaultValue,
    fieldShowError,
    fieldErrorMessage,
  } = useYodaField({ name, defaultValue, onChange, validation });

  const selectAllOption = useMemo(() => ({ id: 'all', label: 'Select All' }), []);

  const extendedOptions = useMemo(() => {
    if (!enableSelectAll) {
      return options;
    }

    return [selectAllOption, ...options].sort((a, b) => (a.id === 'all' ? -1 : b.id === 'all' ? 1 : a.label.localeCompare(b.label)));
  }, [enableSelectAll, options, selectAllOption]);

  // eslint-disable-next-line max-len
  const findCurrentMultiOptionsByIds = useCallback((idsList: MultiSelectIdsType) => findMultipleOptionsByIds(freeOption, extendedOptions, idsList), [freeOption, extendedOptions]);

  const handleChange = useCallback(
    (event: SyntheticEvent, value: (SelectOption | string)[], reason: AutocompleteChangeReason) => {
      const isSelectAllChosen = value.some((option) => (typeof option !== 'string' && option.id === 'all'));

      if (isSelectAllChosen) {
        const allOptions = options.map((option) => option);
        onChangeFieldSynthetic(event, allOptions, reason);
        return;
      }

      onChangeFieldSynthetic(event, value, reason);
    },
    [onChangeFieldSynthetic, options],
  );

  return {
    fieldValue,
    fieldDefaultValue,
    fieldShowError,
    fieldErrorMessage,
    extendedOptions,
    findCurrentMultiOptionsByIds,
    handleChange,
  };
};

export default useMultiSelectYoda;
