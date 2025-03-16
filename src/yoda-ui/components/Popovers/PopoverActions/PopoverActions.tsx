import { FC, MouseEvent, useState } from 'react';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';
import Popover from 'yoda-ui/components/Popovers/Popover';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const popoverStyle = {
  root: {
    marginLeft: '1rem',
  },
};

type PopoverActionsProps = {
  actions: { label: string; handleClick: Function }[];
  popoverTriggerLabel: string;
  buttonStartIcon?: Icons;
};

const PopoverActions: FC<PopoverActionsProps> = ({
  actions,
  popoverTriggerLabel,
  buttonStartIcon,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = !!anchorEl;

  const handleOpenPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={ handleOpenPopover }
        startIcon={ buttonStartIcon ? <Icon name={ buttonStartIcon } /> : null }
        buttonType={ ButtonType.neutral }
      >
        { popoverTriggerLabel }
      </Button>
      <Popover
        sx={ popoverStyle }
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handleClosePopover }
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right',
          }
        }
      >
        <Box
          minWidth="200px"
          padding={ YodaSpacing.xxSmall }
          boxSizing="border-box"
        >
          {
            actions && actions.map((action) => {
              const { label, handleClick } = action;
              return (
                <Box key={ label } padding={ YodaSpacing.small }>
                  <Button onClick={ () => handleClick() } buttonType={ ButtonType.secondary }>
                    { label }
                  </Button>
                </Box>
              );
            })
          }
        </Box>
      </Popover>
    </Box>
  );
};

export default PopoverActions;
