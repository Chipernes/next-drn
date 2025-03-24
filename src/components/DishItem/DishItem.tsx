import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

const DishItem = () => {
  return (
    <Box>
      <Box sx={ { padding: YodaSpacing.xxxSmall } } className="max-w-lg border rounded-lg shadow-md flex">
        <Box className="flex-1">
          <Box className="text-lg font-bold">Вегеторія</Box>
          <Box sx={ { color: YodaColors.red } } className="text-red-600 text-xl font-bold">229 UAH</Box>
          <Box className="text-gray-700 text-sm mt-2">
            На томатному соусі з печерицями, артишоками, баклажанами, цукіні, болгарським перцем-гриль, маслинами, міксом салатів, соусом
            песто та фісташками
          </Box>
          <Box className="flex items-center text-gray-500 text-sm mt-2 space-x-3">470г</Box>
        </Box>
        <img className="w-24 h-24 rounded-lg ml-4 object-cover" src="/mnt/data/image.png" alt="Піца Вегеторія"/>
      </Box>
    </Box>
  );
};
export default DishItem;
