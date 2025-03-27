'use client';

import { IKImage } from 'imagekitio-next';
import { Dish } from 'basics/types/schema.types';
import { config } from 'config/config';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

const DishItem = ({ allDishes }: { allDishes: Dish[] }) => {
  return (
    <Box className='divide-y divide-gray-400'>
      <Box className='bg-gray-100 border-x border-gray-400 border-t rounded-t-xl font-bold text-center text-3xl py-2'>
        Піца
      </Box>
      {
        allDishes.map((dish: Dish) => (
          <Box
            key={ dish.id }
            className='
              p-4 max-w-xl bg-white border-gray-400 flex
              border-x first:border-t last:border-b last:rounded-b-xl
              hover:bg-gray-100 hover:cursor-pointer
            '
          >
            <Box className="flex-1">
              <Box className="text-lg font-bold">{ dish.title }</Box>
              <Box sx={ { color: YodaColors.red } } className="text-red-600 text-xl font-bold">{ dish.price } UAH</Box>
              <Box className="text-sm mt-2">{ dish.description }</Box>
              <Box className="flex items-center text-gray text-sm mt-2 space-x-3">{ dish.weight }г</Box>
            </Box>
            <IKImage
              urlEndpoint={ config.env.imagekit.urlEndpoint }
              path={ dish.picture }
              alt="Dish image"
              width={ 152 }
              height={ 114 }
              className="w-[152px] h-[114px] rounded-lg ml-4 object-cover"
            />
          </Box>
        ))
      }
    </Box>
  );
};
export default DishItem;
