'use client';

import { IKImage } from 'imagekitio-next';
import { config } from 'config/config';
import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

const DishItem = () => {
  return (
    <Box>
      <Box sx={ { padding: YodaSpacing.small } } className="max-w-xl border-x border-gray-400 flex">
        <Box className="flex-1">
          <Box className="text-lg font-bold">Вегеторія</Box>
          <Box sx={ { color: YodaColors.red } } className="text-red-600 text-xl font-bold">229 UAH</Box>
          <Box className="text-sm mt-2">
            На томатному соусі з печерицями, артишоками, баклажанами, цукіні, болгарським перцем-гриль, маслинами, міксом салатів, соусом
            песто та фісташками
          </Box>
          <Box className="flex items-center text-gray text-sm mt-2 space-x-3">470г</Box>
        </Box>
        <IKImage
          urlEndpoint={ config.env.imagekit.urlEndpoint }
          path='dishes/vegetoria.webp'
          alt='Dish image'
          width={ 152 }
          height={ 114 }
          className="w-[152px] h-[114px] rounded-lg ml-4 object-cover"
        />
      </Box>
    </Box>
  );
};
export default DishItem;
