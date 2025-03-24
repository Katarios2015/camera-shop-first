import {Link, useParams, NavLink} from 'react-router-dom';
import { useAppSelector } from '../../hooks/index-hook';
import { getGoods } from '../../store/goods-data/selectors';
import { AppRoute } from '../app/const';

import useBreadcrumbs from 'use-react-router-breadcrumbs';

function BreadCrumbs():JSX.Element{
  const params = useParams();
  const currentProductId = Number(params.id);
  const goods = useAppSelector(getGoods);
  const currentProduct = goods.find((item)=>item.id === currentProductId);

  const routes = [
    { path: `${AppRoute.Catalog}`, breadcrumb: 'Каталог'},
    { path: `${AppRoute.Product}/:id`, breadcrumb: currentProduct?.name },
    { path: `${AppRoute.Product}`, breadcrumb: null },
    { path: '/:id', breadcrumb: null },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
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
          {breadcrumbs.map(({breadcrumb, match })=>(
            <li key={match.pathname} className="breadcrumbs__item">
              <NavLink className={({isActive})=>isActive ? 'breadcrumbs__link--active' : 'breadcrumbs__link'} to={match.pathname}>
                {
                  ({isActive})=>(
                    isActive ?
                      <span className="breadcrumbs__link breadcrumbs__link--active"> {breadcrumb}</span> :
                      <>
                        {breadcrumb}
                        <svg width={5} height={8} aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini" />
                        </svg>
                      </>
                  )
                }
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default BreadCrumbs;
