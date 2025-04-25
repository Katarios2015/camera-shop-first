import {getSortedGoods} from '../components/catalog-list/common';
import { GoodType } from '../types/good-type';
import {SortTypes, SortDirectionTypes, SortParamsKeys} from '../components/sort-catalog/common';

export default function useSort(searchParams:URLSearchParams, goods:GoodType[]) {
  const actualSortDirection = searchParams.get(SortParamsKeys.Direction) ? searchParams.get(SortParamsKeys.Direction) : SortDirectionTypes.LowToHigh;

  const actualSortType = searchParams.get(SortParamsKeys.Sort) ? searchParams.get(SortParamsKeys.Sort) : SortTypes.Price;

  const sortedGoods = actualSortType && actualSortDirection ? getSortedGoods(goods,actualSortType,actualSortDirection) : goods;

  return sortedGoods;
}
