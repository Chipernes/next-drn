import { db } from '../../database/drizzle';
import { users } from '../../database/schema';
import { pageStyle } from 'app/page.style';
import Box from 'yoda-ui/components/Box';

export default async function Home() {
  const result = await db.select().from(users);
  const allUsers = JSON.stringify(result, null, 2);

  return (
    <Box style={ pageStyle }>
      Main page
      Vercel and CI/CD
      <Box>
        { allUsers }
      </Box>
    </Box>
  );
}
