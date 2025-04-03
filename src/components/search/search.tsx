import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';
import { useRef, useState } from 'react';
import { AppRoute } from '../app/const';
import { GoodType } from '../../types/good-type';

const MINIMAL_SYMBOLS_FOR_SEARCH = 3;
//const FIRST_SEARCH_RESULT_COUNT = 4;

function Search():JSX.Element{
  const goods = useAppSelector(getGoods);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [requestLength, setRequestLength] = useState(0);
  const [filtredBySearchGoods, setFiltredBySearchGoods] = useState<GoodType[]>([]);

  /*const slisedArr= goods.slice();
  slisedArr.sort((a,b)=>a.name - b.name)
  console.log(slisedArr);*/


  const handleSearchInputRefInput = ()=>{

    if(searchInputRef.current){
      const request = searchInputRef.current.value;
      setRequestLength(Number(request.length));
      if(Number(request.length) >= MINIMAL_SYMBOLS_FOR_SEARCH){
        const filtredGoods:GoodType[] = [];
        goods.forEach((item)=>{
          if(item.name.toLowerCase().includes(request.toLowerCase())){
            filtredGoods.push(item);
            setFiltredBySearchGoods(filtredGoods);
          }
        });
      }
    }
  };

  const handleResetButtonClick = ()=>{
    if(searchInputRef.current){
      searchInputRef.current.value = '';
      setRequestLength(0);
      setFiltredBySearchGoods([]);
    }
  };


  return(
    <>
      <div className="form-search">
        <form>
          <label>
            <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-lens" />
            </svg>
            <input
              onInput={handleSearchInputRefInput}
              ref={searchInputRef}
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
            />
          </label>
          <ul
            className="form-search__select-list"
            style={requestLength >= MINIMAL_SYMBOLS_FOR_SEARCH ? {visibility:'visible', opacity:'1'} : {visibility:'hidden', opacity:'0'}}
            data-testid='selectList'
          >
            {filtredBySearchGoods ? filtredBySearchGoods.map((item)=>(
              <li
                key={item.id}
                className="form-search__select-item"
                tabIndex={0}
              >
                <Link to={`${AppRoute.Product}/${item.id}`}>{item.name}</Link>
              </li>
            )) : ''}
          </ul>
        </form>
        <button
          onClick={handleResetButtonClick}
          className="form-search__reset"
          type="reset"
          style={requestLength > 0 ? {display:'block'} : {display:'none'}}
          data-testid = 'resetButton'
        >
          <svg width={10} height={10} aria-hidden="true" data-testid="search-icon">
            <use xlinkHref="#icon-close" />
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
      <a className="header__basket-link" href="#">
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
      </a>
    </>

  );

}

export default Search;
