import { GoodType } from '../../types/good-type';
import { useMemo } from 'react';

export default function useDefaultGoodsPrices (filtredGoods:GoodType[]) {
  return useMemo(()=>{
    if (filtredGoods.length === 0) {
      return { minimumGoodPrice: 0, maximumGoodPrice: 0 };
    }else{
      const sortedByPriceGoods = [...filtredGoods].sort((a, b) => a.price - b.price);
      return{
        minimumGoodPrice: sortedByPriceGoods[0].price,
        maximumGoodPrice: sortedByPriceGoods[sortedByPriceGoods.length - 1].price
      };
    }
  }, [filtredGoods]);
}
