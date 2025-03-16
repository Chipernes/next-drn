import { Autocomplete, AutocompleteInputChangeReason } from '@mui/material';
import { ChangeEvent, FC, SyntheticEvent, useCallback } from 'react';
import { SelectOption } from 'basics/options/options.types';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import { selectStyle, textFieldStyle } from 'yoda-ui/components/Form/SelectYoda/SelectYoda.styles';
import { SelectYodaInputProps, SortType } from 'yoda-ui/components/Form/SelectYoda/SelectYoda.types';
import TextField from 'yoda-ui/components/Form/TextField';
import Paper from 'yoda-ui/components/Paper';
import { findOptionById } from 'yoda-ui/utils/options.utils';
import { useYodaField } from 'yoda-ui/yodaForm';
import { isValidId } from 'yoda-ui/yodaForm/yodaForm.types';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const SelectYoda: FC<SelectYodaInputProps> = ({
  onChange,
  defaultValue,
  label,
  name,
  freeOption = false,
  freeDefaultValue = false,
  options,
  placeholder,
  disabled,
  disableClearable,
  required,
  validation,
  maxHeight,
  overflow,
  loading = false,
  loadingText = 'Loading...',
  clearOption = false,
  sortType = SortType.Alphabetical,
}) => {
  const { onChangeFieldSynthetic,
    onChangeField,
    fieldValue,
    fieldDefaultValue,
    fieldShowError,
    fieldErrorMessage,
    setValue } = useYodaField({ name, defaultValue, onChange, validation });

  const findCurrentOptionById = useCallback((id: string | number): SelectOption | null => findOptionById(options, id), [options]);

  const handleInputChange = (event: SyntheticEvent<Element, Event>, _newInputValue: string,
    reason: AutocompleteInputChangeReason) => {
    if ((freeOption && reason === 'input')) {
      const changeEvent = event as ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
      if (changeEvent.target.value === '') {
        setValue(name, null);
      } else {
        onChangeField(changeEvent);
      }
    }
  };

  const handleValue = () => {
    if ((freeOption && fieldValue) || clearOption) {
      return { id: fieldValue, label: fieldValue };
    }
    if (freeDefaultValue && fieldValue) {
      const existingOption = findCurrentOptionById(fieldValue);
      return existingOption || { id: fieldValue, label: fieldValue };
    }
    if (fieldValue && isValidId(fieldValue)) {
      return findCurrentOptionById(fieldValue);
    }
    return null;
  };

  const handleDefaultValue = () => {
    if (freeOption && fieldDefaultValue) {
      return { id: fieldDefaultValue, label: fieldDefaultValue };
    }
    if (freeDefaultValue && fieldDefaultValue) {
      const existingOption = findCurrentOptionById(fieldDefaultValue);
      return existingOption || { id: fieldDefaultValue, label: fieldDefaultValue };
    }
    if (fieldDefaultValue && isValidId(fieldDefaultValue)) {
      return findCurrentOptionById(fieldDefaultValue);
    }
    return null;
  };

  const getSortedOptions = () => {
    if (sortType === SortType.Alphabetical) {
      return options.sort((a, b) => a.label.localeCompare(b.label));
    }

    if (sortType === SortType.Length) {
      return options.sort((a, b) => a.label.length - b.label.length);
    }

    return options;
  };

  return (
    <>
      <Autocomplete
        data-testid="select-yoda"
        freeSolo={ freeOption }
        PaperComponent={
          ({ children }) => (
            <Paper margin={ YodaSpacing.small } overflow={ overflow }>{ children }</Paper>
          )
        }
        sx={
          {
            ...selectStyle,
            '& + .MuiAutocomplete-popper .MuiAutocomplete-listbox': {
              maxHeight,
            },
          }
        }
        disabled={ disabled }
        disablePortal
        value={ handleValue() }
        id={ name }
        loading={ loading }
        loadingText={ loadingText }
        onInputChange={ handleInputChange }
        onChange={ onChangeFieldSynthetic }
        options={ getSortedOptions() }
        defaultValue={ handleDefaultValue() }
        disableClearable={ disableClearable }
        getOptionLabel={ (option) => (typeof option === 'string' ? option : option.label) }
        renderOption={
          (props, option) => {
            return (
              <li { ...props } key={ option.id }>
                { option.label }
              </li>
            );
          }
        }
        renderInput={
          (params) => (
            <TextField
              { ...params }
              sx={ textFieldStyle }
              label={ label }
              placeholder={ placeholder }
              required={ required }
              error={ fieldShowError }
            />
          )
        }
      />
      { fieldShowError && <FormHelperText error>{ fieldErrorMessage }</FormHelperText> }
    </>
  );
};

export default SelectYoda;
