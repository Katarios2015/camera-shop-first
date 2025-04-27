import {SortParamsKeys} from '../../components/sort-catalog/common';
import { GoodType } from '../../types/good-type';
import {FilterParamsKeys} from '../../components/filter-form/common';


export default function useAllFilters(sortedGoods:GoodType[], searchParams: URLSearchParams) {

  const deleteSortParams = (parameter:Record<string, string>)=>{
    for(const item in parameter) {
      if (item === SortParamsKeys.Sort || item === SortParamsKeys.Direction){
        delete parameter[item];
      }
    }
    return parameter;
  };
  const filterAndSortParameters = Object.fromEntries(searchParams.entries());
  const filterParameter = deleteSortParams(filterAndSortParameters);

  const getFilteredGoods = () => {
    if (Object.keys(filterParameter).length === 0) {
      return sortedGoods;
    }

    const categoryFilters = searchParams.getAll(FilterParamsKeys.Category);
    const typeFilters = searchParams.getAll(FilterParamsKeys.Type);
    const levelFilters = searchParams.getAll(FilterParamsKeys.Level);

    const categoryFilteredGoods:GoodType[] = categoryFilters.length > 0
      ? sortedGoods.filter((good) => categoryFilters.includes(good.category))
      : sortedGoods;

    const typeFilteredGoods:GoodType[] = typeFilters.length > 0
      ? categoryFilteredGoods.filter((good) => typeFilters.includes(good.type))
      : categoryFilteredGoods;

    const levelFilteredGoods:GoodType[] = levelFilters.length > 0
      ? typeFilteredGoods.filter((good) => levelFilters.includes(good.level))
      : typeFilteredGoods;

    return levelFilteredGoods;
  };
  const filtredGoods = getFilteredGoods();

  const getFilteredByPriceGoods = () => {
    if (Object.keys(filterParameter).length === 0) {
      return filtredGoods;
    }
    const minimumPriceFilter = searchParams.get(FilterParamsKeys.MinimumPrice);
    const maximumPriceFilter = searchParams.get(FilterParamsKeys.MaximumPrice);

    const minimumPriceFilteredGoods:GoodType[] = minimumPriceFilter
      ? filtredGoods.filter((good) => good.price >= Number(minimumPriceFilter))
      : filtredGoods;
    const maximumPriceFilteredGoods:GoodType[] = maximumPriceFilter
      ? minimumPriceFilteredGoods.filter((good) => good.price <= Number(maximumPriceFilter))
      : minimumPriceFilteredGoods;
    return maximumPriceFilteredGoods;
  };

  const filtredByAllFiltersGoods = getFilteredByPriceGoods();

  return filtredByAllFiltersGoods;
}
