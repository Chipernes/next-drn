export type DishItemPropsType = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  weight: number;
  picture: string;
};

export type DishItemType = {
  id: string;
  title: string;
  description: string;
  price: number;
  weight: number;
  picture: string;
  menu: {
    id: string;
    title: string;
  };
};

export type UseDishType = {
  allDishes: {
    id: string;
    title: string;
    description: string;
    price: number;
    weight: number;
    picture: string;
    menu: {
      id: string;
      title: string;
    };
  }[];
};
