import { FC } from 'react';
import { ActionButtonProps } from 'yoda-ui/components/BiogenLincDS/Buttons/ActionButton/ActionButton.types';
import Box from 'yoda-ui/components/Box';
import Icon from 'yoda-ui/components/Icons/Icon';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

type ActionButtonContentProps = Pick<ActionButtonProps, 'label' | 'icon'>;

const ActionButtonContent: FC<ActionButtonContentProps> = ({ label, icon }) => (
  <>
    {
      icon && (
        <Box marginRight={ YodaSpacing.xxSmall } color={ YodaColors.inherit } alignItems="center" display="flex">
          <Icon name={ icon } fontSize="inherit" />
        </Box>
      )
    }
    { label }
  </>
);

export default ActionButtonContent;
