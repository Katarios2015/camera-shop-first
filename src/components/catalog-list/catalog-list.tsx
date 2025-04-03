import ProductCard from '../product-card/product-card';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';
import {getSortedGoods} from './common';
import { useSearchParams } from 'react-router-dom';
import {SortTypes, SortDirectionTypes, SortParamsKeys} from '../sort-catalog/common';

function CatalogList():JSX.Element {
  const [searchParams,] = useSearchParams();
  const actualSortDirection = searchParams.get(SortParamsKeys.Direction) ? searchParams.get(SortParamsKeys.Direction) : SortDirectionTypes.LowToHigh;

  const actualSortType = searchParams.get('sort') ? searchParams.get(SortParamsKeys.Sort) : SortTypes.Price;

  const goods = useAppSelector(getGoods);
  const sortedGoods = actualSortType && actualSortDirection ? getSortedGoods(goods,actualSortType,actualSortDirection) : goods;

  return(
    <div className="cards catalog__cards">
      { sortedGoods.map((item)=>(
        <ProductCard good={item} key={item.id} isSlider={false} isActiveClass={''} styleSimilar={{}}/>
      ))}
    </div>
  );
}

export default CatalogList;
