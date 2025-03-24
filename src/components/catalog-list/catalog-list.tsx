import ProductCard from '../product-card/product-card';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';

function CatalogList():JSX.Element {
  const goods = useAppSelector(getGoods);

  return(
    <div className="cards catalog__cards">
      { goods.map((item)=>(
        <ProductCard good={item} key={item.id} isSlider={false} isActiveClass={''} styleSimilar={{}}/>
      ))}
    </div>
  );
}

export default CatalogList;
