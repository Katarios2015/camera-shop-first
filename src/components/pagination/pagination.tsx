import { useAppSelector } from '../../hooks/index-hook';
import { getFiltredGoods } from '../../store/goods-data/selectors';
import { useEffect, useState, MouseEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {FilterParamsKeys} from '../filter-form/common';

const PAGINATION_PAGES_COUNT = 3;
const PER_PAGE_GOODS_COUNT = 9;

function Pagination(): JSX.Element|null{

  const filtredGoods = useAppSelector(getFiltredGoods);
  const filtredGoodsLength = filtredGoods.length;
  const pagesCount = Math.ceil(filtredGoodsLength / PER_PAGE_GOODS_COUNT);
  const pages:number[] = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isForward, setIsForward] = useState(true);
  const [isBackward, setIsBackward] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastSliceElement, setLastSliceElement] = useState(PAGINATION_PAGES_COUNT);

  const handleLinkClick = (pageNumber:number, event:MouseEvent)=>{
    event.preventDefault();
    setCurrentPage(pageNumber);
    searchParams.set(FilterParamsKeys.Page,pageNumber.toString());
    setSearchParams(searchParams);
  };

  const handleForwardElementClick = ()=>{
    const newSearchParams = new URLSearchParams(searchParams);
    const newFirstIndex = lastSliceElement - 1;
    setFirstIndex(newFirstIndex);
    setCurrentPage(lastSliceElement + 1);
    newSearchParams.set(FilterParamsKeys.Page, (lastSliceElement + 1).toString());
    setSearchParams(newSearchParams);
    setLastSliceElement(Math.min(newFirstIndex + PAGINATION_PAGES_COUNT, pagesCount));
  };

  const handleBackwardElementClick = ()=>{
    const newSearchParams = new URLSearchParams(searchParams);
    const firstPaginationPageNumber = firstIndex + 1;
    const newLastSliceElement = firstPaginationPageNumber;
    const newCurrentPageNumber = firstPaginationPageNumber - 1;
    setLastSliceElement(newLastSliceElement);

    setCurrentPage(newCurrentPageNumber);
    newSearchParams.set(FilterParamsKeys.Page, (newCurrentPageNumber).toString());
    setSearchParams(newSearchParams);
    setFirstIndex(Math.max(0, firstIndex - PAGINATION_PAGES_COUNT));
  };


  for(let i = 1;i <= pagesCount; i++){
    pages.push(i);
  }
  const slicedPages = pages.slice(firstIndex,lastSliceElement);

  useEffect(() => {
    setIsForward(pagesCount > PAGINATION_PAGES_COUNT && pagesCount !== PAGINATION_PAGES_COUNT);
    if(currentPage === pagesCount || lastSliceElement - 1 === pages.length - 1){
      setIsForward(false);
    }

    setIsBackward(firstIndex !== 0);
  }, [pagesCount, currentPage,firstIndex, lastSliceElement, pages.length]);

  if(filtredGoodsLength <= PER_PAGE_GOODS_COUNT){
    return null;
  }
  return(
    <div className="pagination">
      <ul className="pagination__list">
        { isBackward ?
          <li className="pagination__item"
            onClick={handleBackwardElementClick}
          >
            <Link className="pagination__link pagination__link--text" to='#'>Назад</Link>
          </li> : null}
        { slicedPages.map((pageNumber)=>
          (
            <li
              key={pageNumber}
              className="pagination__item"
              onClick={(event)=>handleLinkClick(pageNumber, event)}
            >
              <Link className={currentPage === pageNumber ? 'pagination__link pagination__link--active' : 'pagination__link'} to='#'>{pageNumber}</Link>
            </li>
          ))}
        {isForward ?
          <li className="pagination__item"
            onClick={handleForwardElementClick}
          >
            <Link className="pagination__link pagination__link--text" to='#'>Далее</Link>
          </li> : null}
      </ul>
    </div>
  );
}
export default Pagination;
