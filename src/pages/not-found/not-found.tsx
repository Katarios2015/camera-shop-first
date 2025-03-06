import { Link } from 'react-router-dom';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import { AppRoute } from '../../components/app/const';

function NotFound():JSX.Element{
  return (
    <div className="wrapper">
      <main>
        <div className="page-content">
          <BreadCrumbs/>
          <div className="page-content__section">
            <section className="catalog">
              <div className="container">
                <h1>Страница не найдена</h1>
                <p>
                  <Link to={AppRoute.Catalog}>
                На главную
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
