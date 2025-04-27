import CategoryFilterList from '../category-filter-list/category-filter-list';
import CheckboxFilterList from '../checkbox-filter-list/checkbox-filter-list';
import {TYPE_CHECKBOX_INPUTS, LEVEL_CHECKBOX_INPUTS} from './common';
import { useSearchParams } from 'react-router-dom';
import { SortParamsKeys } from '../sort-catalog/common';
import PriceFilter from '../price-filter/price-filter';
import { useAppDispatch } from '../../hooks/index-hook';
import { resetFilters } from '../../store/goods-data/goods-data';
import {FilterParamsKeys} from '../filter-form/common';

function FilterForm():JSX.Element{
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleResetButtonClick = (e: React.MouseEvent)=>{
    e.preventDefault();
    const sortParams = [SortParamsKeys.Sort, SortParamsKeys.Direction];
    const pageParams = searchParams.get(FilterParamsKeys.Page);
    const newParams = new URLSearchParams();

    if(pageParams){
      newParams.set(FilterParamsKeys.Page,pageParams);
    }

    sortParams.forEach((param) => {
      const searchSort = searchParams.get(param);
      if (searchSort) {
        newParams.set(param, searchSort);
      }
    });
    setSearchParams(newParams);
    dispatch(resetFilters(true));
  };


  return(
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <PriceFilter/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <CategoryFilterList/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <CheckboxFilterList items={TYPE_CHECKBOX_INPUTS}/>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <CheckboxFilterList items={LEVEL_CHECKBOX_INPUTS}/>
        </fieldset>
        <button
          onClick={handleResetButtonClick}
          className="btn catalog-filter__reset-btn" type="reset"
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
