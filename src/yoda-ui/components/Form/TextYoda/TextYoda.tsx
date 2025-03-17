'use client';

/* eslint-disable import/no-cycle */
import { FC, useState } from 'react';
import TextField from 'yoda-ui/components/Form/TextField';
import { TextYodaInputProps } from 'yoda-ui/components/Form/TextYoda';
import { textYodaNoControlsStyle, textYodaStyle } from 'yoda-ui/components/Form/TextYoda/TextYoda.styles';
import { useYodaField } from 'yoda-ui/yodaForm';
import { SxProps } from 'yoda-ui/yodaTheme';

const TextYoda: FC<TextYodaInputProps> = ({
  defaultValue = '',
  disabled,
  display = true,
  focused,
  hiddeControls,
  label,
  max,
  min,
  multiline,
  name,
  onChange,
  placeholder,
  required,
  rows,
  shrink = true,
  step,
  type,
  validation,
}) => {
  const { onChangeField,
    fieldValue,
    fieldShowError,
    fieldErrorMessage } = useYodaField({ name, defaultValue, onChange, validation });

  let sxStyle: SxProps = hiddeControls ? { ...textYodaStyle, ...textYodaNoControlsStyle } : textYodaStyle;

  if (!display) {
    sxStyle = { display: 'none' };
  }

  const [, setValue] = useState(fieldValue);

  return (
    <TextField
      disabled={ disabled }
      error={ fieldShowError }
      fullWidth
      focused={ focused }
      helperText={ fieldErrorMessage }
      InputLabelProps={ { shrink } }
      inputProps={ { max, min, step } }
      label={ label }
      multiline={ multiline }
      name={ name }
      onChange={
        (event) => {
          onChangeField(event);
          setValue(fieldValue);
        }
      }
      placeholder={ placeholder }
      required={ required }
      rows={ rows }
      sx={ sxStyle }
      type={ type }
      value={ fieldValue }
      variant="outlined"
    />
  );
};

export default TextYoda;
