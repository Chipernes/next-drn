import Image from 'next/image';
import useDishItem from '../components/DishItem/DishItem.hook';
import DishItem from 'components/DishItem/DishItem';
import Box from 'yoda-ui/components/Box';

const Home = async () => {
  const { allDishes } = await useDishItem();

  return (
    <>
      <Box className='max-w-[1200px] rounded-xl m-auto bg-white'>
        <Image
          className='w-[1200px] h-[430px] rounded-t-xl object-cover object-left-bottom'
          width={ 1200 }
          height={ 400 }
          src='/home-bg.webp'
          alt='Background image'
        />
        <Box className='py-5 flex items-center flex-col'>
          <DishItem allDishes={ allDishes }/>
        </Box>
      </Box>
    </>
  );
};

export default Home;
