import { Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FC } from 'react';
import useMultiSelectYoda from './MultiSelectYoda.hook';
import { SelectOption } from 'basics/options/options.types';
import FormHelperText from 'yoda-ui/components/Form/FormHelperText';
import { TagStyle } from 'yoda-ui/components/Form/SelectYoda/MultiSelectYoda/MultiSelectYoda.styles';
import { MultiSelectYodaInputProps } from 'yoda-ui/components/Form/SelectYoda/MultiSelectYoda/MultiSelectYoda.types';
import { selectStyle, textFieldStyle } from 'yoda-ui/components/Form/SelectYoda/SelectYoda.styles';
import TextField from 'yoda-ui/components/Form/TextField';
import Paper from 'yoda-ui/components/Paper';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const MultiSelectYoda: FC<MultiSelectYodaInputProps> = ({
  defaultValue,
  disableClearable,
  disabled,
  freeOption = false,
  label,
  name,
  onChange,
  options,
  placeholder,
  required,
  validation,
  enableSelectAll = false,
}) => {
  const {
    fieldValue,
    fieldDefaultValue,
    fieldShowError,
    fieldErrorMessage,
    extendedOptions,
    findCurrentMultiOptionsByIds,
    handleChange,
  } = useMultiSelectYoda(
    name,
    defaultValue,
    onChange,
    validation,
    options,
    freeOption,
    enableSelectAll,
  );

  return (
    <>
      <Autocomplete
        data-testid="multi-select"
        multiple
        PaperComponent={
          ({ children }) => (
            <Paper margin={ YodaSpacing.small }>{ children }</Paper>
          )
        }
        sx={ selectStyle }
        freeSolo={ freeOption }
        disabled={ disabled }
        options={ extendedOptions }
        getOptionLabel={
          (option) => {
            return typeof option === 'string' ? option : option.label;
          }
        }
        defaultValue={ findCurrentMultiOptionsByIds(fieldDefaultValue) }
        disableClearable={ disableClearable }
        value={ findCurrentMultiOptionsByIds(fieldValue) }
        onChange={ handleChange }
        renderTags={
          (value: readonly SelectOption[], getTagProps) => value.map((option: SelectOption, index: number) => (
            <Chip variant="filled" label={ option.label } { ...getTagProps({ index }) } key={ index } sx={ TagStyle }/>
          ))
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

export default MultiSelectYoda;
