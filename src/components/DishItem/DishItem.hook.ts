import { getDishes } from 'lib/api/dishes';

const useDishItem = async () => {
  const dishes = await getDishes();

  return {
    dishes,
  };
};

export default useDishItem;
