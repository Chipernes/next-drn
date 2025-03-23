import { auth, signOut } from 'lib/auth';

const useHeader = async () => {
  const session = await auth();
  const handleLogout = async () => {
    'use server';

    await signOut();
  };

  return {
    handleLogout,
    session,
  };
};

export default useHeader;
