import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import Loader from 'yoda-ui/components/Loader';
import { YodaColors } from 'yoda-ui/yodaTheme';

const LoaderButtonContent: FC = () => (
  <Box display="flex" color={ YodaColors.inherit }>
    <Loader center size={ 1 } paddingX={ 0 } color={ YodaColors.inherit } />
  </Box>
);

export default LoaderButtonContent;
