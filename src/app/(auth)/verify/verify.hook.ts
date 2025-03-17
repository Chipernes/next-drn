import { redirect } from 'next/navigation';
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

  const handleVerifyAuthForm: AuthFormSubmitCallbackType = (userData) => {
    // console.log(userData);
    return userData;
  };

  return {
    handleCancelAuthForm,
    handleVerifyAuthForm,
    getAllUsers,
  };
};
export default useVerify;
