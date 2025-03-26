import { pageStyle } from 'app/page.style';
import DishItem from 'components/DishItem/DishItem';
import Box from 'yoda-ui/components/Box';
import ImageUpload from 'yoda-ui/components/ImageUpload/ImageUpload';

const Home = () => {
  return (
    <>
      <Box style={ pageStyle }>
        Main page with client menu for future
        <Box className='mt-5'>
          <DishItem/>
        </Box>
      </Box>
      <ImageUpload/>
    </>
  );
};

export default Home;
