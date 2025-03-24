import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogList from '../../components/catalog-list/catalog-list';
import PopupCall from '../../components/popup-call/popup-call';
import PromoSlider from '../../components/promo-slider/promo-slider.tsx';
function MainCatalog():JSX.Element{
  return(
    <div className="wrapper">
      <main>
        <PromoSlider/>
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
export default MainCatalog;
