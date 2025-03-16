import { redirect } from 'next/navigation';
import { AuthFormSubmitCallbackType } from 'components/AuthForm/AuthForm.types';

const useVerify = () => {
  const handleCancelAuthForm = () => {
    redirect('/');
  };

  const handleVerifyAuthForm: AuthFormSubmitCallbackType = (userData) => {
    // console.log(userData);
    return userData;
  };

  return {
    handleCancelAuthForm,
    handleVerifyAuthForm,
  };
};
export default useVerify;
