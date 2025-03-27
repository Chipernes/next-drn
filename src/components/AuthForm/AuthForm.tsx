import { FC } from 'react';
import useAuthForm from './AuthForm.hook';
import { AuthFormPropsType } from './AuthForm.types';
import FormContainer from 'components/FormContainer/FormContainer';
import FormLayoutContainer from 'components/FormLayout/FormLayoutContainer';
import Box from 'yoda-ui/components/Box';
import TextYoda from 'yoda-ui/components/Form/TextYoda';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const StrategicImperativeForm: FC<AuthFormPropsType> = ({
  submitCallback,
  cancelCallback,
}) => {
  const {
    cancelButtonConfig,
    authFormConfig,
    submitButtonConfig,
    providerFields,
  } = useAuthForm(submitCallback, cancelCallback);

  return (
    <FormContainer providerFields={ providerFields } cancelButtonConfig={ cancelButtonConfig } submitButtonConfig={ submitButtonConfig } >
      <Box>
        <Box className='text-center font-bold text-2xl pb-5 border-b'>Diner Right Now</Box>
        <Box className='text-center pt-3 mb-8 text-lg'>Sign in</Box>
      </Box>
      <FormLayoutContainer className='gap-3' flexDirection="column" >
        <Box>
          <TextYoda { ...authFormConfig.login } />
        </Box>
        <Box paddingTop={ YodaSpacing.small }>
          <TextYoda { ...authFormConfig.password } />
        </Box>
      </FormLayoutContainer>
    </FormContainer>
  );
};

export default StrategicImperativeForm;
