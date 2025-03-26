import { pageStyle } from 'app/page.style';
import DishItem from 'components/DishItem/DishItem';
import Box from 'yoda-ui/components/Box';

const Home = () => {
  return (
    <>
      <Box className='mb-10' style={ pageStyle }>
        Main page with client menu for future
        <Box className='mt-5 flex items-center flex-col divide-y divide-gray-400'>
          <DishItem/>
          <DishItem/>
          <DishItem/>
          <DishItem/>
          <DishItem/>
        </Box>
      </Box>
    </>
  );
};

export default Home;
