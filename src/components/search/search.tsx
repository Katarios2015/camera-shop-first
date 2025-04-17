import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';
import { useRef, useState, KeyboardEvent, FormEvent, useEffect } from 'react';
import { AppRoute } from '../app/const';
import { GoodType } from '../../types/good-type';


const MINIMAL_SYMBOLS_FOR_SEARCH = 3;
const FIRST_SEARCH_RESULT_COUNT = 4;

function Search():JSX.Element{
  const goods = useAppSelector(getGoods);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [requestLength, setRequestLength] = useState(0);
  const [filtredBySearchGoods, setFiltredBySearchGoods] = useState<GoodType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
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
      setSelectedIndex(-1);
    }
  };

  const handleArrowKeyDown = (event: KeyboardEvent<HTMLInputElement|HTMLLIElement>) => {
    if (filtredBySearchGoods.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(
          selectedIndex < filtredBySearchGoods.length - 1 ? selectedIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(
          selectedIndex <= 0 ? filtredBySearchGoods.length - 1 : selectedIndex - 1
        );
        break;
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < filtredBySearchGoods.length) {
          const url = new URL(`${AppRoute.Product}/${filtredBySearchGoods[selectedIndex].id}`, window.location.origin);
          navigate(url.pathname);
          handleResetButtonClick();
        }
        break;
      case 'Escape':
        handleResetButtonClick();
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listItemsRef.current[selectedIndex]) {
      listItemsRef.current[selectedIndex]?.focus();
      listItemsRef.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);


  return(
    <>
      <div className={requestLength >= MINIMAL_SYMBOLS_FOR_SEARCH ? 'form-search list-opened' : 'form-search'}>
        <form onSubmit={handleSubmit}>
          <label>
            <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-lens" />
            </svg>
            <input
              onInput={handleSearchInputRefInput}
              onKeyDown={handleArrowKeyDown}
              ref={searchInputRef}
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
            />
          </label>
          <ul
            className={filtredBySearchGoods.length > FIRST_SEARCH_RESULT_COUNT ? 'form-search__select-list scroller' : 'form-search__select-list'}
            data-testid='selectList'
          >
            {filtredBySearchGoods ? filtredBySearchGoods.map((item,index)=>(
              <li
                onKeyDown={handleArrowKeyDown}
                onFocus={() => setSelectedIndex(index)}
                ref={(el) => (listItemsRef.current[index] = el)}
                key={item.id}
                className="form-search__select-item"
                tabIndex={0}
              >
                <Link
                  onClick={handleResetButtonClick}
                  tabIndex={-1}
                  to={`${AppRoute.Product}/${item.id}`}
                >{item.name}
                </Link>
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
