'use client';

import useVerify from './verify.hook';
import AuthForm from 'components/AuthForm/AuthForm';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';

const Page = () => {
  const {
    handleCancelAuthForm,
    handleVerifyAuthForm,
    handleVerifyWithGoogle,
  } = useVerify();

  return (
    <Box className='min-w-[500px]'>
      <AuthForm submitCallback={ handleVerifyAuthForm } cancelCallback={ handleCancelAuthForm }/>
      <Button onClick={ handleVerifyWithGoogle }>
        Увійти через Google
      </Button>
    </Box>
  );
};
export default Page;
