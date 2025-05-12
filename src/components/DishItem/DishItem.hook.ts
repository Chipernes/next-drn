'use client';

import { useEffect, useState } from 'react';
import { Dish } from 'basics/types/schema.types';
import { getDishes } from 'lib/api/dishes';

const useDishItem = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    getDishes().then(setDishes);
  }, []);

  return {
    dishes,
  };
};

export default useDishItem;
