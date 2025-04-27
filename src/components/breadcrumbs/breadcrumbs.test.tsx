import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {withHistory, withStore} from '../../utils/mock-component';

import BreadCrumbs from './breadcrumbs';
import { AppRoute } from '../app/const';

import { makeFakeStore, makeFakeProductCard } from '../../utils/mocks';

describe('Component: BreadCrumbs', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render correct when user navigate to "/"', () => {
    const fakeProduct = makeFakeProductCard();
    const withHistoryComponent = withHistory(<BreadCrumbs />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({DATA_GOODS: {
      goods:[fakeProduct],
      product: null,
      filtredGoods: [],
      isReset:false
    },
    MODAL_CALL: {
      isModalCallActive: false,
      activeGood: null,
    },
    DATA_REVIEWS:{
      reviews:[]
    },
    }));
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render correct when user navigate to /camera/{productId}', () => {
    const fakeProduct = makeFakeProductCard();

    const withHistoryComponent = withHistory(<BreadCrumbs />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({DATA_GOODS: {
      goods:[fakeProduct],
      product: fakeProduct,
      filtredGoods: [],
      isReset:false
    },
    MODAL_CALL: {
      isModalCallActive: false,
      activeGood: null,
    },
    DATA_REVIEWS:{
      reviews:[]
    },
    }));
    mockHistory.push(`/${AppRoute.Product}/${fakeProduct.id}`);
    render(withStoreComponent);

    const links = screen.getAllByRole('link');
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(links.length).toBe(3);
  });

});
