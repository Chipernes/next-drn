'use client';

import useVerify from './verify.hook';
import AuthForm from 'components/AuthForm/AuthForm';
import Box from 'yoda-ui/components/Box';

const Page = () => {
  const {
    handleCancelAuthForm,
    handleVerifyAuthForm,
  } = useVerify();

  return (
    <Box className='min-w-[500px]'>
      <AuthForm submitCallback={ handleVerifyAuthForm } cancelCallback={ handleCancelAuthForm }/>
    </Box>
  );
};
export default Page;
