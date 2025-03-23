import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaFontSize } from 'yoda-ui/yodaTheme';

const Page = async () => {
  return (
    <Box sx={ { fontSize: YodaFontSize.xxxLarge, color: YodaColors.blue8 } }>This is administration page</Box>
  );
};
export default Page;
