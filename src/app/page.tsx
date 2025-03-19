import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { pageStyle } from 'app/page.style';
import Box from 'yoda-ui/components/Box';

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/verify');
  }

  return (
    <Box style={ pageStyle }>
      Main page with client menu for future
    </Box>
  );
}
