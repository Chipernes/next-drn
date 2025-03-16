import { FC, MouseEventHandler } from 'react';
import LoaderButtonContent from './LoaderButtonContent';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon/Icon';

export type ActionButtonProps = {
  buttonProps: {
    disabled?: boolean;
    onClick?: MouseEventHandler;
    buttonType: ButtonType;
    startIconName?: Icons;
  };
  label: string;
  loading?: boolean;
  hidden?: boolean;
};

const ActionButton: FC<ActionButtonProps> = ({ hidden, buttonProps, label, loading = false }) => {
  const { startIconName, ...rest } = buttonProps;
  const startIconProp = startIconName ? { startIcon: <Icon name={ startIconName } /> } : null;
  const buttonContent = loading
    ? <LoaderButtonContent />
    : label;

  return (
    <Box hidden={ hidden }>
      <Button { ...startIconProp } { ...rest }>
        { buttonContent }
      </Button>
    </Box>
  );
};

export default ActionButton;
