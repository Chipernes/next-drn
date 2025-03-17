import { FC } from 'react';
import useAuthForm from './AuthForm.hook';
import { AuthFormPropsType } from './AuthForm.types';
import FormContainer from 'components/FormContainer/FormContainer';
import { FormLayoutContainer } from 'components/FormLayout';
import Box from 'yoda-ui/components/Box';
import TextYoda from 'yoda-ui/components/Form/TextYoda';
import { YodaJustifyContent, YodaSpacing } from 'yoda-ui/yodaTheme';

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
      <FormLayoutContainer justifyContent={ YodaJustifyContent.spaceBetween } flexDirection="column" >
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
