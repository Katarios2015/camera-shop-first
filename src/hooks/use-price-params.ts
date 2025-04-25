import { useSearchParams } from 'react-router-dom';

export default function usePriceParams(){
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePriceParams = (priceCurrentValue:string, filterParamsKey:string)=>{
    const newSearchParams = new URLSearchParams(searchParams);

    if (!priceCurrentValue) {
      newSearchParams.delete(filterParamsKey);
      setSearchParams(newSearchParams);
    } else{
      newSearchParams.set(filterParamsKey, priceCurrentValue);
      setSearchParams(newSearchParams);
    }
  };
  return updatePriceParams;

}
