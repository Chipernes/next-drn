import Checkbox from '@mui/material/Checkbox';
import { FC } from 'react';
import FormControlLabel from 'yoda-ui/components/Form/FormControlLabel';
import { useYodaField } from 'yoda-ui/yodaForm';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type CheckBoxYodaProps = {
  label: string;
  name: string;
  disabled?: boolean;
  onChange?: Function;
  checked?: boolean;
  validation?: YodaFieldValidation;
};

const CheckBoxYoda: FC<CheckBoxYodaProps> = ({
  label,
  name,
  disabled = false,
  onChange,
  checked,
  validation,
}) => {
  const { onSwitchField,
    fieldValue } = useYodaField({ name, defaultValue: checked, onChange, validation });

  return (
    <FormControlLabel
      control={
        (
          <Checkbox
            checked={ !!fieldValue }
            color="primary"
            onChange={ onSwitchField }
            disabled={ disabled }
          />
        )
      }
      label={ label }
    />
  );
};

export default CheckBoxYoda;
