import { Dish } from 'basics/types/schema.types';
import { config } from 'config/config';

const getDishes = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/dishes`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to fetch dishes: ${error.message}`);
  }
};

const useDishItem = async () => {
  const allDishes: Dish[] = await getDishes();

  return {
    allDishes,
  };
};

export default useDishItem;
