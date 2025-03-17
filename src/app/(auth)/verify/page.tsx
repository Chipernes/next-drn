'use client';

import { useEffect, useState } from 'react';
import useVerify from './verify.hook';
import AuthForm from 'components/AuthForm/AuthForm';
import Box from 'yoda-ui/components/Box';

const Page = () => {
  const {
    handleCancelAuthForm,
    handleVerifyAuthForm,
    getAllUsers,
  } = useVerify();
  const [users, setUsers] = useState('');

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, [getAllUsers]);

  return (
    <Box>
      <Box>
        { users }
      </Box>
      <AuthForm submitCallback={ handleVerifyAuthForm } cancelCallback={ handleCancelAuthForm }/>
    </Box>
  );
};
export default Page;
