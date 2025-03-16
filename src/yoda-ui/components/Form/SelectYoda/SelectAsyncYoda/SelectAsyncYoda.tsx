import Autocomplete from '@mui/material/Autocomplete';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { SelectOption } from 'basics/options/options.types';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import { SelectAsyncYodaInputProps } from 'yoda-ui/components/Form/SelectYoda/SelectAsyncYoda/SelectAsyncYoda.types';
import { selectStyle, textFieldStyle } from 'yoda-ui/components/Form/SelectYoda/SelectYoda.styles';
import TextField from 'yoda-ui/components/Form/TextField';
import Paper from 'yoda-ui/components/Paper';
import { findOptionById } from 'yoda-ui/utils/options.utils';
import { useYodaField } from 'yoda-ui/yodaForm';
import { isValidId } from 'yoda-ui/yodaForm/yodaForm.types';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const SelectAsyncYoda: FC<SelectAsyncYodaInputProps> = ({
  defaultValue,
  disableClearable,
  disabled,
  label,
  lazyQueryHook,
  messageEmpty = '',
  messageInitial = '',
  minQueryLength = 3,
  messageLoading = '',
  name,
  onChange,
  onInputChange,
  placeholder,
  required,
  validation,
}) => {
  const {
    onChangeFieldSynthetic,
    fieldValue,
    fieldDefaultValue,
    fieldShowError,
    fieldErrorMessage,
  } = useYodaField({ name, defaultValue, onChange, validation });
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(messageInitial);
  const { lazyQuery, loading, data } = lazyQueryHook();

  useEffect(() => {
    const queryLength = query.trim().length >= minQueryLength;
    if (queryLength) {
      lazyQuery({
        variables: { name: query.trim() },
      });
    }
  }, [query, minQueryLength, lazyQuery]);

  useEffect(() => {
    if (loading) {
      setMessage(messageLoading);
    }
    if (data) {
      const listLength = data.length;
      if (!loading && listLength === 0) {
        setMessage(messageEmpty);
      }
    }
  }, [loading, data, messageEmpty, messageLoading]);

  const findCurrentOptionById = useCallback((id: string | number): SelectOption | null => findOptionById(data, id), [data]);

  const handleInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (onInputChange) {
      onInputChange(event);
    }
  };

  return (
    <>
      <Autocomplete
        data-testid="async-select"
        PaperComponent={
          ({ children }) => (
            <Paper margin={ YodaSpacing.small }>{ children }</Paper>
          )
        }
        sx={ selectStyle }
        disabled={ disabled }
        disablePortal
        value={ fieldValue ? findCurrentOptionById(fieldValue as string) : null }
        id={ name }
        onChange={ onChangeFieldSynthetic }
        options={ data || [] }
        defaultValue={ fieldDefaultValue && isValidId(fieldDefaultValue) ? findCurrentOptionById(fieldDefaultValue) : null }
        disableClearable={ disableClearable }
        getOptionLabel={ (option) => option.label }
        // getOptionSelected={ (option, valueSelected) => option.id === valueSelected.id }
        noOptionsText={ message }
        renderInput={
          (params) => (
            <TextField
              { ...params }
              sx={ textFieldStyle }
              label={ label }
              placeholder={ placeholder }
              onChange={ handleInputTextChange }
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

export default SelectAsyncYoda;
