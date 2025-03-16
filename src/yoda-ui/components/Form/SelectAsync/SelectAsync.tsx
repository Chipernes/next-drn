import Autocomplete from '@mui/material/Autocomplete';
import { FC } from 'react';
import useSelectAsync from './SelectAsync.hook';
import { SelectAsyncProps } from './SelectAsync.types';
import { selectStyle, textFieldStyle } from 'yoda-ui/components/Form/SelectYoda/SelectYoda.styles';
import TextField from 'yoda-ui/components/Form/TextField';
import Paper from 'yoda-ui/components/Paper';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const SelectAsync: FC<SelectAsyncProps> = ({
  disableClearable,
  disabled,
  label,
  placeholder,
  required,
  ...useSelectAsyncParams
}) => {
  const {
    handleSelectChange,
    message,
    value,
    handleInputTextChange,
    options,
  } = useSelectAsync(useSelectAsyncParams);

  return (
    <Autocomplete
      data-testid="select-async"
      PaperComponent={
        ({ children }) => (
          <Paper margin={ YodaSpacing.small }>{ children }</Paper>
        )
      }
      sx={ selectStyle }
      disabled={ disabled }
      disableClearable={ disableClearable }
      disablePortal
      getOptionLabel={ (option) => option.label }
      onChange={ handleSelectChange }
      options={ options }
      noOptionsText={ message }
      value={ value }
      renderInput={
        (params) => (
          <TextField
            { ...params }
            label={ label }
            placeholder={ placeholder }
            sx={ textFieldStyle }
            onChange={ handleInputTextChange }
            required={ required }
          />
        )
      }
    />
  );
};

export default SelectAsync;
