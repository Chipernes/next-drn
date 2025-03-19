import { redirect } from 'next/navigation';
import { signOut } from '../../../auth';

const useHeader = () => {
  const handleLogout = async () => {
    'use server';

    await signOut();
    redirect('/verify');
  };

  return {
    handleLogout,
  };
};

export default useHeader;
