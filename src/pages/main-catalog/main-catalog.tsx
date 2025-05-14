import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogList from '../../components/catalog-list/catalog-list';
import FilterForm from '../../components/filter-form/filter-form.tsx';
import PopupCall from '../../components/popup-call/popup-call';
import PopupAddCart from '../../components/popup-cart/popup-cart.tsx';
import PromoSlider from '../../components/promo-slider/promo-slider.tsx';
import SortCatalog from '../../components/sort-catalog/sort-catalog.tsx';
import Pagination from '../../components/pagination/pagination.tsx';
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
                  <FilterForm/>
                </div>
                <div className="catalog__content">
                  <SortCatalog/>
                  <CatalogList />
                  <Pagination/>
                </div>
              </div>
            </div>
          </section>
        </div>
        <PopupAddCart/>
      </main>
    </div>
  );
}
export default MainCatalog;
