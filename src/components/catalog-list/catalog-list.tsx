import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from '../../hooks/index-hook';

import { getGoods } from '../../store/goods-data/selectors';
import { filterGoods } from '../../store/goods-data/goods-data';
import {FilterParamsKeys} from '../filter-form/common';

import ProductCard from '../product-card/product-card';

import useAllFilters from '../../hooks/use-all-filters';
import useSort from '../../hooks/use-sort';

const DEFAULT_PAGE_NUMBER = 1;
const PER_PAGE_GOODS_COUNT = 9;

function CatalogList():JSX.Element {
  const [searchParams,] = useSearchParams();
  const dispatch = useAppDispatch();
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(PER_PAGE_GOODS_COUNT);

  const goods = useAppSelector(getGoods);

  const sortedGoods = useSort(searchParams, goods);
  const filtredByAllFiltersGoods = useAllFilters(sortedGoods, searchParams);

  const pageCurrentNumber = searchParams.get(FilterParamsKeys.Page) ? Number(searchParams.get(FilterParamsKeys.Page)) : DEFAULT_PAGE_NUMBER;

  useEffect(()=>{
    dispatch(filterGoods(filtredByAllFiltersGoods));
  },[filtredByAllFiltersGoods, dispatch]);

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
