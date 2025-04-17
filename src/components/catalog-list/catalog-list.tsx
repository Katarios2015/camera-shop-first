import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector,useAppDispatch } from '../../hooks/index-hook';

import { getGoods } from '../../store/goods-data/selectors';
import { filterGoods } from '../../store/goods-data/goods-data';
import {getSortedGoods} from './common';
import {SortTypes, SortDirectionTypes, SortParamsKeys} from '../sort-catalog/common';
import { GoodType } from '../../types/good-type';
import {FilterParamsKeys} from '../filter-form/common';
import ProductCard from '../product-card/product-card';

const DEFAULT_PAGE_NUMBER = 1;
const PER_PAGE_GOODS_COUNT = 9;

function CatalogList():JSX.Element {
  const [searchParams,] = useSearchParams();
  const dispatch = useAppDispatch();
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(PER_PAGE_GOODS_COUNT);

  const pageCurrentNumber = searchParams.get(FilterParamsKeys.Page) ? Number(searchParams.get(FilterParamsKeys.Page)) : DEFAULT_PAGE_NUMBER;

  const actualSortDirection = searchParams.get(SortParamsKeys.Direction) ? searchParams.get(SortParamsKeys.Direction) : SortDirectionTypes.LowToHigh;

  const actualSortType = searchParams.get(SortParamsKeys.Sort) ? searchParams.get(SortParamsKeys.Sort) : SortTypes.Price;

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

  const goods = useAppSelector(getGoods);
  const sortedGoods = actualSortType && actualSortDirection ? getSortedGoods(goods,actualSortType,actualSortDirection) : goods;

  const getFilteredGoods = () => {
    if (Object.keys(filterParameter).length === 0) {
      return sortedGoods;
    }

    const categoryFilters = searchParams.getAll(FilterParamsKeys.Category);
    const typeFilters = searchParams.getAll(FilterParamsKeys.Type);
    const levelFilters = searchParams.getAll(FilterParamsKeys.Level);
    //const minimumPriceFilter = searchParams.get(FilterParamsKeys.MinimumPrice);
    //const maximumPriceFilter = searchParams.get(FilterParamsKeys.MaximumPrice);

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

  useEffect(()=>{
    dispatch(filterGoods(filtredGoods));
  },[filtredGoods, dispatch]);

  useEffect(()=>{
    const currentLastIndex = pageCurrentNumber * PER_PAGE_GOODS_COUNT;
    setLastIndex(currentLastIndex);
    const currentFirstIndex = currentLastIndex - PER_PAGE_GOODS_COUNT;
    setFirstIndex(currentFirstIndex);

  },[pageCurrentNumber]);


  return(
    <div className="cards catalog__cards">
      { [...filtredByAllFiltersGoods].slice(firstIndex,lastIndex).map((item)=>(
        <ProductCard good={item} key={item.id} isSlider={false} isActiveClass={''} styleSimilar={{}}/>
      ))}
    </div>
  );
}

export default CatalogList;
