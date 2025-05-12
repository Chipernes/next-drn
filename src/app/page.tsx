'use client';

import Image from 'next/image';
import DishItem from 'components/DishItem/DishItem';
import useDishItem from 'components/DishItem/DishItem.hook';
import Box from 'yoda-ui/components/Box';

const Home = () => {
  const { dishes } = useDishItem();

  return (
    <>
      <Box
        className='max-w-[1200px] rounded-xl m-auto overflow-hidden'
      >
        <Image
          className='w-[1200px] h-[430px] rounded-t-xl object-cover object-left-bottom'
          width={ 1200 }
          height={ 400 }
          src='/home-bg.webp'
          alt='Background image'
        />
        <Box className='py-5 flex items-center flex-col bg-white'>
          <DishItem allDishes={ dishes }/>
        </Box>
      </Box>
    </>
  );
};

export default Home;
