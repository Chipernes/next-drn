'use client';

import useVerify from './verify.hook';
import AuthForm from 'components/AuthForm/AuthForm';

const Page = () => {
  const { handleCancelAuthForm, handleVerifyAuthForm } = useVerify();

  return (
    <AuthForm submitCallback={ handleVerifyAuthForm } cancelCallback={ handleCancelAuthForm }/>
  );
};
export default Page;
