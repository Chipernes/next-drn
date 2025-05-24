'use client';

import { IKImage } from 'imagekitio-next';
import { DishItemType, UseDishType } from './DishItem.type';
import { config } from 'config/config';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

const DishItem = ({ allDishes }: UseDishType) => {
  const groupedByMenu = allDishes.reduce<Record<string, DishItemType[]>>((acc, dish) => {
    const menuTitle = dish.menu?.title ?? 'Без категорії';
    if (!acc[menuTitle]) acc[menuTitle] = [];
    acc[menuTitle].push(dish);
    return acc;
  }, {});

  return (
    <Box className="w-full max-w-4xl">
      {
        Object.entries(groupedByMenu).map(([menuTitle, dishes]) => (
          <Box key={ menuTitle } className="mb-6 border rounded-xl overflow-hidden">
            <Box className="bg-gray-100 border-b border-gray-300 text-center font-bold text-2xl py-3">
              { menuTitle }
            </Box>
            {
              dishes.map((dish) => (
                <Box
                  key={ dish.id }
                  className="flex p-4 bg-white border-t last:rounded-b-xl hover:bg-gray-50 transition"
                >
                  <Box className="flex-1">
                    <Box className="text-lg font-bold">{ dish.title }</Box>
                    <Box sx={ { color: YodaColors.red } } className="text-red-600 text-xl font-bold">
                      { dish.price } UAH
                    </Box>
                    <Box className="text-sm mt-2">{ dish.description }</Box>
                    <Box className="flex items-center text-gray-500 text-sm mt-2">{ dish.weight } г</Box>
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
        ))
      }
    </Box>
  );
};

export default DishItem;
