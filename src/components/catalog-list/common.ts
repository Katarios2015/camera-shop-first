import { GoodType } from '../../types/good-type';
import {SortTypes, SortDirectionTypes} from '../sort-catalog/common';

export const getSortedGoods = (goods:GoodType[],actualTypeSort:string, actualDirectionSort:string):GoodType[]=> {
  const slicedGoods = [...goods];
  switch (actualTypeSort) {
    case SortTypes.Price:
      return actualDirectionSort === SortDirectionTypes.LowToHigh
        ? slicedGoods.sort((a, b) => a.price - b.price)
        : slicedGoods.sort((a, b) => b.price - a.price);

    case SortTypes.Popular:
      return actualDirectionSort === SortDirectionTypes.LowToHigh
        ? slicedGoods.sort((a, b) => a.rating - b.rating)
        : slicedGoods.sort((a, b) => b.rating - a.rating);

    default:
      return slicedGoods.sort((a,b)=>a.price - b.price);
  }
};
