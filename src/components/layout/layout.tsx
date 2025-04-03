import {Link, Outlet} from 'react-router-dom';
import NavigateList from '../navigate-list/navigate-list';
import FooterList from '../footer-list/footer-list';
import { NAVIGATE_ITEMS } from '../navigate-list/const';
import {SOURCE_ITEMS, SUPPORT_ITEMS, SOCIAL_ITEMS} from './const';
import SocialList from '../social-list/social-list';
import { AppRoute } from '../app/const';
import Search from '../search/search';

function Layout():JSX.Element {
  return(
    <>
      <header className="header" id="header" data-testid='header'>
        <div className="container">
          <Link className="header__logo" to={AppRoute.Catalog} aria-label="Переход на главную" data-testid='headerLogo'>
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </Link>
          <NavigateList/>
          <Search/>
        </div>
      </header>
      <Outlet />
      <footer className="footer" data-testid='footer'>
        <div className="container">
          <div className="footer__info">
            <Link className="footer__logo" to={AppRoute.Catalog} aria-label="Переход на главную" data-testid='footerLogo'>
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </Link>
            <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
            <SocialList socialItems={SOCIAL_ITEMS}/>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <FooterList footerItems={NAVIGATE_ITEMS}/>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <FooterList footerItems={SOURCE_ITEMS}/>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <FooterList footerItems={SUPPORT_ITEMS}/>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Layout;
