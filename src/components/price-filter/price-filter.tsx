import {ChangeEvent, useEffect, useState} from 'react';
import {useSearchParams } from 'react-router-dom';

import {getFiltredGoods, getIsReset} from '../../store/goods-data/selectors';
import {FilterParamsKeys} from '../filter-form/common';
import {useAppSelector, useAppDispatch } from '../../hooks/index-hook';
import {resetFilters} from '../../store/goods-data/goods-data';

import usePriceParams from '../../hooks/use-price-params/use-price-params';
import useValidatePrice from '../../hooks/use-validate-price/use-validate-price';
import useDefaultGoodsPrices from '../../hooks/use-default-good-prices/use-default-goods-prices';

function PriceFilter(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isReset = useAppSelector(getIsReset);
  const filtredGoods = useAppSelector(getFiltredGoods);

  const [searchParams, setSearchParams] = useSearchParams();
  const [minimumPriceValue, setMinimumPriceValue] = useState<string>('');
  const [maximumPriceValue, setMaximumPriceValue] = useState<string>('');

  const updatePriceParams = usePriceParams();

  const {minimumGoodPrice, maximumGoodPrice} = useDefaultGoodsPrices(filtredGoods);

  const {
    validateMinimumCurrentValue,
    validateMaximumCurrentValue
  } = useValidatePrice(minimumGoodPrice, maximumGoodPrice, Number(minimumPriceValue), Number(maximumPriceValue));

  useEffect(() => {
    setMinimumPriceValue(searchParams.get(FilterParamsKeys.MinimumPrice) ?? '');
    setMaximumPriceValue(searchParams.get(FilterParamsKeys.MaximumPrice) ?? '');

    if(isReset){
      setMinimumPriceValue('');
      setMaximumPriceValue('');
      setSearchParams(searchParams);
      dispatch(resetFilters(false));
    }
  }, [isReset, searchParams, setSearchParams, dispatch]);

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
    setMinimumPriceValue(validateMinimumCurrentValue(minimumPriceValue));
    updatePriceParams(validateMinimumCurrentValue(minimumPriceValue), FilterParamsKeys.MinimumPrice);
  };

  const handleMaximumPriceBlur = () => {
    setMaximumPriceValue(validateMaximumCurrentValue(maximumPriceValue));
    updatePriceParams(validateMaximumCurrentValue(maximumPriceValue), FilterParamsKeys.MaximumPrice);
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
            placeholder={`${minimumGoodPrice}`}
            value={minimumPriceValue}
            data-testid='inputMin'
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
            placeholder={`${maximumGoodPrice}`}
            data-testid='inputMax'
          />
        </label>
      </div>
    </div>
  );
}

export default PriceFilter;
