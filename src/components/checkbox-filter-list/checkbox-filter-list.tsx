import {CheckboxType} from '../../types/checkbox-type';
import { useSearchParams } from 'react-router-dom';
import {ChangeEvent, useEffect} from 'react';
import { FilterParamsKeys, FilterParamsValues, CirilicFilters, getParamKey, getCirilicParamValue } from '../filter-form/common';

type CheckboxFilterType={
  items:CheckboxType[];
}

function CheckboxFilterList(prop:CheckboxFilterType):JSX.Element{
  const {items} = prop;
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParameter = searchParams.get(FilterParamsKeys.Category);
  const typeParams = searchParams.getAll(FilterParamsKeys.Type);
  const disabledFilterTypes = typeParams.filter((type)=>type === CirilicFilters.Film || type === CirilicFilters.Snapshot);

  useEffect(() => {
    if(categoryParameter === CirilicFilters.Videocamera && disabledFilterTypes.length > 0){
      disabledFilterTypes.forEach((typeValue)=>{
        searchParams.delete(FilterParamsKeys.Type, typeValue);
      });
      setSearchParams(searchParams);
    }
  }, [categoryParameter,disabledFilterTypes, searchParams, setSearchParams]);

  const getDisabled = (item:CheckboxType)=>{
    if(categoryParameter === CirilicFilters.Videocamera){
      if(item.name === FilterParamsValues.TypeFilm || item.name === FilterParamsValues.TypeSnapshot){
        return true;
      }
    }
    return false;
  };

  const getChecked = (item:CheckboxType)=>{
    const paramKey = getParamKey(getCirilicParamValue(item.name));
    return searchParams.getAll(paramKey).includes(getCirilicParamValue(item.name));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>)=>{
    const inputName = event.currentTarget.name;
    const cirilicParamValue = getCirilicParamValue(inputName);
    const paramKey = getParamKey(cirilicParamValue);

    if (event.currentTarget.checked) {
      if (!searchParams.getAll(paramKey).includes(cirilicParamValue)) {
        searchParams.append(paramKey, cirilicParamValue);
      }
    }else {
      searchParams.delete(paramKey, cirilicParamValue);
    }
    setSearchParams(searchParams);
  };

  return(
    <>
      {items.map((item)=>(
        <div key={item.name} className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name={item.name}
              onChange={handleCheckboxChange}
              checked={getChecked(item)}
              disabled={getDisabled(item)}
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{item.label}</span>
          </label>
        </div>
      ))}
    </>
  );
}
export default CheckboxFilterList;
