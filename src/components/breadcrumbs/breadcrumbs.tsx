import {Link, useLocation, useParams} from 'react-router-dom';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';
import { AppRoute } from '../app/const';

function BreadCrumbs():JSX.Element{
  const params = useParams();
  const currentProductId = Number(params.id);
  const currentLocation = useLocation();
  const goods = useAppSelector(getGoods);
  const currentProduct = goods.find((item)=>item.id === currentProductId);

  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          { currentLocation.pathname.includes(AppRoute.Catalog) && (
            <li className="breadcrumbs__item">
              { currentLocation.pathname.includes(`/${AppRoute.Product}/`) ?
                <Link className="breadcrumbs__link" to={'/'}>
                Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"/>
                  </svg>
                </Link> :
                <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>}
            </li>
          )}
          { currentLocation.pathname.includes(`/${AppRoute.Product}/${currentProductId}`) && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active"> {currentProduct?.name}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default BreadCrumbs;
