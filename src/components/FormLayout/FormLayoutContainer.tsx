import { BoxProps } from '@mui/material/Box';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';

const FormLayoutContainer: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      position="relative"
      { ...props }
    >
      { children }
    </Box>
  );
};

export default FormLayoutContainer;
