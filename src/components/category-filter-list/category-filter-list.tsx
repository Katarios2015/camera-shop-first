import {CATEGORY_RADIO_INPUTS} from '../filter-form/common';
import { useSearchParams } from 'react-router-dom';
import {ChangeEvent} from 'react';
import{FilterParamsKeys} from '../filter-form/common';
import { getCirilicParamValue } from '../filter-form/common';


function CategoryFilterList():JSX.Element{
  const [searchParams, setSearchParams] = useSearchParams({});
  const handleRudioButtonChange = (event: ChangeEvent<HTMLInputElement>)=>{
    const inputDefaultValue = event.currentTarget.value;
    if(event.currentTarget){
      searchParams.set(FilterParamsKeys.Category,getCirilicParamValue(inputDefaultValue));
      setSearchParams(searchParams);
    }
  };
  const getChecked = (item:typeof CATEGORY_RADIO_INPUTS[0])=> searchParams.getAll(FilterParamsKeys.Category).includes(getCirilicParamValue(item.defaultValue));
  return(
    <>
      {CATEGORY_RADIO_INPUTS.map((item)=>(
        <div key={item.defaultValue}className="custom-radio catalog-filter__item">
          <label>
            <input
              data-testid = 'categoryButton'
              checked={getChecked(item)}
              onChange={handleRudioButtonChange}
              type="radio"
              name={item.name}
              defaultValue={item.defaultValue}
            />
            <span className="custom-radio__icon"/>
            <span className="custom-radio__label">{item.label}</span>
          </label>
        </div>
      ))}
    </>
  );
}

export default CategoryFilterList;
