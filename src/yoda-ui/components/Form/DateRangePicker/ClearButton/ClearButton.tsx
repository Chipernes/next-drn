import { FC } from 'react';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';
import IconButton from 'yoda-ui/components/Icons/IconButton';

type ClearButtonProps = {
  onClick: React.MouseEventHandler;
  disabled?: boolean;
};

const ClearButton: FC<ClearButtonProps> = ({ onClick, disabled }) => (
  <IconButton onClick={ onClick } disabled={ disabled } >
    <Icon name={ Icons.clear } fontSize="small" />
  </IconButton>
);

export default ClearButton;
