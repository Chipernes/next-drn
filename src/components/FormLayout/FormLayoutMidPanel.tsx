import { ReactNode } from 'react';
import { formLayoutPaddingTop } from './FormLayout.styles';
import Box from 'yoda-ui/components/Box';

const FormLayoutMidPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flex="grow"
      flexGrow={ 1 }
      paddingTop={ formLayoutPaddingTop }
    >
      { children }
    </Box>
  );
};

export default FormLayoutMidPanel;
