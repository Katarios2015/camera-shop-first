import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';

import MainCatalog from './main-catalog';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogList from '../../components/catalog-list/catalog-list';
import PopupCall from '../../components/popup-call/popup-call';

describe('Component: MainCatalog', () => {
  it('should render correctly', () => {
    vi.mock('../../components/breadcrumbs/breadcrumbs');
    vi.mock('../../components/catalog-list/catalog-list');
    vi.mock('../../components/popup-call/popup-call');
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<MainCatalog/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[fakeProduct],
        product: null,
      },
      MODAL_CALL: {
        isModalCallActive: false,
        activeGood: null,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(BreadCrumbs).toBeCalledTimes(1);
    expect(CatalogList).toBeCalledTimes(1);
    expect(PopupCall).toBeCalledTimes(1);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
