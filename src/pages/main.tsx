import BreadCrumbs from '../components/breadcrumbs/breadcrumbs';
import CatalogList from '../components/catalog-list/catalog-list';
import PopupCall from '../components/popup-call/popup-call';

function Main():JSX.Element{

  return(
    <div className="wrapper">
      <main>
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x" /><img src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width={1280} height={280} alt="баннер" />
          </picture>
          <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><a className="btn" href="#">Подробнее</a></p>
        </div>
        <div className="page-content">
          <BreadCrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                </div>
                <div className="catalog__content">
                  <CatalogList />
                </div>
              </div>
            </div>
          </section>
        </div>
        <PopupCall/>
      </main>
    </div>
  );
}
export default Main;
