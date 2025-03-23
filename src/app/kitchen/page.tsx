import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaFontSize } from 'yoda-ui/yodaTheme';

const Page = async () => {
  return (
    <Box sx={ { fontSize: YodaFontSize.xxxLarge, color: YodaColors.blue8 } }>This is kitchen page</Box>
  );
};
export default Page;
