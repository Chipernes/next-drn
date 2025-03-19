import { redirect } from 'next/navigation';
import { signInWithCredentials/* , signUp */ } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';
import { AuthFormSubmitCallbackType } from 'components/AuthForm/AuthForm.types';

const useVerify = () => {
  const getAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      return JSON.stringify(data);
    } catch (error) {
      return JSON.stringify({ error: 'Failed to load users' });
    }
  };

  const handleCancelAuthForm = () => {
    redirect('/');
  };

  const handleVerifyAuthForm: AuthFormSubmitCallbackType = async (userData) => {
    // const result = await signUp(userData);
    const result = await signInWithCredentials(userData);
    if (result.success) {
      successToast('You have successfully signed in');

      redirect('/');
    } else {
      warningToast('Login or password are not valid');
    }
  };

  return {
    handleCancelAuthForm,
    handleVerifyAuthForm,
    getAllUsers,
  };
};
export default useVerify;
