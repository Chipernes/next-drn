'use client';

import { redirect, useRouter } from 'next/navigation';
import { signInWithCredentials, signInWithGoogle/* , signUp */ } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';
import { AuthFormSubmitCallbackType } from 'components/AuthForm/AuthForm.types';

const useVerify = () => {
  const router = useRouter();

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
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);

      successToast('You have successfully signed in');

      router.push('/');
    } else {
      warningToast('Login or password are not valid');
    }
  };

  const handleVerifyWithGoogle = async () => {
    const result = await signInWithGoogle();

    if (result.success) {
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      successToast('You have successfully signed in with Google');

      redirect(result.redirectLink);
    } else {
      warningToast('Some error where occurred during registration via Google');
    }
  };

  return {
    handleCancelAuthForm,
    handleVerifyAuthForm,
    getAllUsers,
    handleVerifyWithGoogle,
  };
};
export default useVerify;
