import { ChangeEvent, useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFiltredGoods, getIsReset } from '../../store/goods-data/selectors';
import {FilterParamsKeys} from '../filter-form/common';
import { useAppSelector, useAppDispatch } from '../../hooks/index-hook';

import { resetFilters } from '../../store/goods-data/goods-data';

function PriceFilter(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isReset = useAppSelector(getIsReset);
  const [searchParams, setSearchParams] = useSearchParams();

  const filtredGoods = useAppSelector(getFiltredGoods);
  const [minimumPriceValue, setMinimumPriceValue] = useState<string>('');
  const [maximumPriceValue, setMaximumPriceValue] = useState<string>('');
  const [autoFlag, setAutoFlag] = useState(false);

  const searchMaximumPrice = searchParams.get(FilterParamsKeys.MaximumPrice);
  const searchMinimumPrice = searchParams.get(FilterParamsKeys.MinimumPrice);
  const searchTypes = searchParams.getAll(FilterParamsKeys.Type);
  const searchCategories = searchParams.getAll(FilterParamsKeys.Category);
  const searchLevels = searchParams.getAll(FilterParamsKeys.Level);

  let minimumGoodPrice:number;
  let maximumGoodPrice:number;

  if (filtredGoods.length === 0) {
    minimumGoodPrice = 0;
    maximumGoodPrice = 0;
  }else{
    const goodsSortedByPrice = [...filtredGoods].sort((a, b) => a.price - b.price);
    minimumGoodPrice = goodsSortedByPrice[0].price;
    maximumGoodPrice = goodsSortedByPrice[goodsSortedByPrice.length - 1].price;
  }

  useEffect(() => {

    const newParams = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (searchMinimumPrice && Number(searchMinimumPrice) < minimumGoodPrice) {
      newParams.set(FilterParamsKeys.MinimumPrice, minimumGoodPrice.toString());
      setMinimumPriceValue(minimumGoodPrice.toString());
      shouldUpdate = true;
      setAutoFlag(true);
    }

    if (maximumGoodPrice !== 0 && searchMaximumPrice && Number(searchMaximumPrice) > maximumGoodPrice) {
      newParams.set(FilterParamsKeys.MaximumPrice, maximumGoodPrice.toString());
      setMaximumPriceValue(maximumGoodPrice.toString());

      shouldUpdate = true;
      setAutoFlag(true);
    }

    if(autoFlag && Number(maximumPriceValue) !== 0){
      if (
        maximumPriceValue &&
    minimumPriceValue &&
    Number(maximumPriceValue) < Number(minimumPriceValue) &&
    Number(searchMaximumPrice) !== Number(minimumPriceValue)
      ) {
        newParams.delete(FilterParamsKeys.MaximumPrice);
        setMaximumPriceValue('');
        shouldUpdate = true;
        setAutoFlag(false);
      }
    }

    if (shouldUpdate) {
      setSearchParams(newParams);
    }
  }, [minimumGoodPrice, maximumGoodPrice, searchCategories, searchTypes, searchLevels]);


  useEffect(() => {
    if (searchMinimumPrice !== null) {
      setMinimumPriceValue(searchMinimumPrice);
    } else {
      setMinimumPriceValue('');
    }

    if (searchMaximumPrice !== null) {
      setMaximumPriceValue(searchMaximumPrice);
    } else {
      setMaximumPriceValue('');
    }

    if(isReset){
      setMinimumPriceValue('');
      setMaximumPriceValue('');
      setSearchParams(searchParams);
      dispatch(resetFilters(false));
    }
  }, [searchMinimumPrice, searchMaximumPrice, isReset, searchParams, setSearchParams, dispatch]);

  const handlePriceInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
    priceValue: string,
    paramKey: string
  ) => {
    if(priceValue){
      setter('');
      searchParams.delete(paramKey);
      setSearchParams(searchParams);
    }
    setter(event.target.value);
  };

  const handleMinimumPriceBlur = () => {
    if (!minimumPriceValue) {
      searchParams.delete(FilterParamsKeys.MinimumPrice);
      setSearchParams(searchParams);
      return;
    }

    const numericMinimumPriceValue = Number(minimumPriceValue);
    let validatedValue = numericMinimumPriceValue;

    if (numericMinimumPriceValue < minimumGoodPrice) {
      validatedValue = minimumGoodPrice;
      setMinimumPriceValue(validatedValue.toString());
      searchParams.set(FilterParamsKeys.MinimumPrice, validatedValue.toString());
      setSearchParams(searchParams);
    }if(maximumPriceValue && numericMinimumPriceValue > Number(maximumPriceValue) || numericMinimumPriceValue > maximumGoodPrice){
      setMinimumPriceValue('');
      return;
    }
    setMinimumPriceValue(validatedValue.toString());
    searchParams.set(FilterParamsKeys.MinimumPrice, validatedValue.toString());
    setSearchParams(searchParams);
  };

  const handleMaximumPriceBlur = () => {
    if (!maximumPriceValue) {
      return;
    }

    const numericMaximumPriceValue = Number(maximumPriceValue);
    let validatedValue = numericMaximumPriceValue;

    if (numericMaximumPriceValue > maximumGoodPrice) {
      validatedValue = maximumGoodPrice;
      setMaximumPriceValue(validatedValue.toString());
      searchParams.set(FilterParamsKeys.MaximumPrice, validatedValue.toString());
      setSearchParams(searchParams);
    } if(minimumPriceValue && numericMaximumPriceValue < Number(minimumPriceValue) && numericMaximumPriceValue !== Number(minimumPriceValue)){
      setMaximumPriceValue('');
      return;
    }

    setMaximumPriceValue(validatedValue.toString());
    searchParams.set(FilterParamsKeys.MaximumPrice, validatedValue.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            onChange={(e) => handlePriceInputChange(e, setMinimumPriceValue,minimumPriceValue, FilterParamsKeys.MinimumPrice)}
            onBlur={handleMinimumPriceBlur}
            type="number"
            name="price"
            placeholder={`от ${minimumGoodPrice}`}
            value={minimumPriceValue}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            onChange={(e) => handlePriceInputChange(e, setMaximumPriceValue, maximumPriceValue, FilterParamsKeys.MaximumPrice)}
            onBlur={handleMaximumPriceBlur}
            value={maximumPriceValue}
            type="number"
            name="priceUp"
            placeholder={`до ${maximumGoodPrice}`}
          />
        </label>
      </div>
    </div>
  );
}

export default PriceFilter;
