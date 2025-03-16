import { FC } from 'react';
import { TextButtonProps } from 'yoda-ui/components/BiogenLincDS/Buttons/TextButton/TextButton.types';
import Box from 'yoda-ui/components/Box';
import Icon from 'yoda-ui/components/Icons/Icon';
import Loader from 'yoda-ui/components/Loader';
import { YodaSpacing, YodaColors } from 'yoda-ui/yodaTheme';

type TextButtonContentProps = Pick<TextButtonProps, 'label' | 'icon' | 'loading'>;

const TextButtonContent: FC<TextButtonContentProps> = ({ label, icon, loading }) => (
  <>
    <Box display='flex' color={ YodaColors.inherit } visibility={ loading ? 'hidden' : 'inherit' }>
      <Box color={ YodaColors.inherit }>
        { label }
      </Box>
      {
        icon && (
          <Box marginLeft={ YodaSpacing.xxSmall } color={ YodaColors.inherit } display="flex" alignItems="center">
            <Icon name={ icon } fontSize='small'/>
          </Box>
        )
      }
    </Box>
    <Box
      display='flex'
      visibility={ loading ? 'inherit' : 'hidden' }
      position="absolute"
      hidden={ !loading }
      color={ YodaColors.inherit }>
      <Loader center size={ 1 } color={ YodaColors.inherit } paddingX={ YodaSpacing.none } />
    </Box>
  </>
);

export default TextButtonContent;
