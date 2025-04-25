export default function useValidatePrice (
  minimumGoodPrice:number,
  maximumGoodPrice: number,
  minimumPriceValue:number,
  maximumPriceValue:number){

  const validateMinimumCurrentValue = (currentValue:string)=>{
    if (currentValue && Number(currentValue) < minimumGoodPrice) {
      return minimumGoodPrice.toString();
    }if(maximumPriceValue && Number(currentValue) > Number(maximumPriceValue) || Number(currentValue) > maximumGoodPrice){
      return '';
    }
    return currentValue;
  };

  const validateMaximumCurrentValue = (currentValue: string)=>{
    if (currentValue && Number(currentValue) > maximumGoodPrice) {
      return maximumGoodPrice.toString();
    } if(minimumPriceValue && Number(currentValue) < Number(minimumPriceValue) && Number(currentValue) !== Number(minimumPriceValue)){
      return '';
    }
    return currentValue;
  };
  return {
    validateMinimumCurrentValue,
    validateMaximumCurrentValue
  };

}
