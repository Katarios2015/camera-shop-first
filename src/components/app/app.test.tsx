import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {AppRoute} from './const';
import App from './app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "MainCatalog" when user navigate to "/"', () => {
    const fakeProduct = makeFakeProductCard();
    const withHistoryComponent = withHistory(<App />, mockHistory);
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

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/camera/{productId}"', () => {
    const fakeProductPage = makeFakeProductCard();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({DATA_GOODS: {
      goods:[fakeProductPage],
      product: fakeProductPage,
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
    const productPrice = 'productPrice';
    const description = 'description';
    mockHistory.push(`${AppRoute.Product}/${fakeProductPage.id}`);

    render(withStoreComponent);

    expect(screen.getAllByText(fakeProductPage.name).length).toBe(2);
    expect(screen.getByTestId(productPrice).textContent).toBe(`Цена:${fakeProductPage.price.toLocaleString('ru')} ₽`);
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByTestId(description).textContent).toBe(fakeProductPage.description);
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    render(withStoreComponent);
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });
});
