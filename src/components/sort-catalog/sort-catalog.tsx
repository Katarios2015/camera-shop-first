import {MouseEvent} from 'react';
import {SortTypes, SortDirectionTypes, SortParamsKeys} from './common';
import { useSearchParams } from 'react-router-dom';

function SortCatalog():JSX.Element{
  const [searchParams, setSearchParams] = useSearchParams({
    [SortParamsKeys.Sort]:SortTypes.Price,
    [SortParamsKeys.Direction]:SortDirectionTypes.LowToHigh
  });

  const handleDirectionInputClick = (event: MouseEvent<HTMLInputElement>)=>{
    if(event.currentTarget){
      const inputId = event.currentTarget.id;
      searchParams.set(SortParamsKeys.Direction,`${inputId}`);
      setSearchParams(searchParams);
    }
  };

  const handleSortTypeInputClick = (event: MouseEvent<HTMLInputElement>)=>{
    if(event.currentTarget){
      const inputId = event.currentTarget.id;
      searchParams.set(SortParamsKeys.Sort,`${inputId}`);
      setSearchParams(searchParams);
    }
  };
  return(
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                onClick={handleSortTypeInputClick}
                type="radio"
                id="sortPrice"
                name="sort"
                defaultChecked={searchParams.get(SortParamsKeys.Sort) === SortTypes.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onClick={handleSortTypeInputClick}
                type="radio"
                id="sortPopular"
                name="sort"
                defaultChecked={searchParams.get(SortParamsKeys.Sort) === SortTypes.Popular}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                onClick={handleDirectionInputClick}
                type="radio"
                id="up"
                name="sort-icon"
                defaultChecked={searchParams.get(SortParamsKeys.Direction) === SortDirectionTypes.LowToHigh}
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                onClick={handleDirectionInputClick}
                type="radio"
                id="down"
                name="sort-icon"
                defaultChecked={searchParams.get(SortParamsKeys.Direction) === SortDirectionTypes.HighToLow}
                aria-label="По убыванию"
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SortCatalog;
