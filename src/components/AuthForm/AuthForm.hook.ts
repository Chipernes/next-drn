import { useState } from 'react';
import useAuthFormConfig from './AuthForm.config';
import { AuthFormCancelCallbackType, AuthFormSubmitCallbackType } from './AuthForm.types';
import { authFormToBE } from 'basics/transformers/authForm.transformer';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import { useYodaCreateForm } from 'yoda-ui/yodaForm';

const useAuthForm = (
  submitCallback: AuthFormSubmitCallbackType,
  cancelCallback: AuthFormCancelCallbackType,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { authFormConfig } = useAuthFormConfig();
  const { getValues, providerFields, resetForm, useWatchForm } = useYodaCreateForm();
  const { isValid } = useWatchForm();

  const handleCancelAuthForm = () => {
    resetForm();
    cancelCallback();
  };

  const handleVerifyAuthForm = async () => {
    setIsSubmitting(true);
    const formValues = getValues();
    const formattedAuth = authFormToBE(formValues);

    await submitCallback(formattedAuth);

    setIsSubmitting(false);
  };

  const cancelButtonConfig = {
    buttonProps: {
      onClick: handleCancelAuthForm,
      buttonType: ButtonType.secondary,
    },
    label: 'Cancel',
  };

  const submitButtonConfig = {
    buttonProps: {
      onClick: handleVerifyAuthForm,
      buttonType: ButtonType.primary,
      disabled: !isValid || isSubmitting,
    },
    label: 'Verify',
    loading: isSubmitting,
  };

  return {
    cancelButtonConfig,
    authFormConfig,
    submitButtonConfig,
    providerFields,
  };
};

export default useAuthForm;
