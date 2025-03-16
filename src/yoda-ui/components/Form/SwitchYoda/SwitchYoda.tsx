import { FC } from 'react';
import Switch from 'yoda-ui/components/Switch';
import { useYodaField } from 'yoda-ui/yodaForm';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

type SwitchYodaProps = {
  name: string;
  defaultValue?: boolean;
  disabled?: boolean;
  onChange?: Function;
  validation?: YodaFieldValidation;
};

const SwitchYoda: FC<SwitchYodaProps> = ({
  name,
  defaultValue,
  disabled = false,
  validation,
  onChange,
}) => {
  const { fieldValue, onSwitchField } = useYodaField({ name, defaultValue, onChange, validation });

  return (
    <Switch
      name={ name }
      onSwitch={ onSwitchField }
      disabled={ disabled }
      checked={ fieldValue === true }
    />
  );
};

export default SwitchYoda;
