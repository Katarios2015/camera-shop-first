import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {AppRoute} from './const';
import App from './app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore, makeFakeProductCard, makeFakeReview} from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "MainCatalog" when user navigate to "/"', () => {
    const fakeProductPage = makeFakeProductCard();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({DATA_GOODS: {
      goods:[fakeProductPage],
      product: null
    },
    MODAL_CALL: {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
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
    const fakeReview = makeFakeReview();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({DATA_GOODS: {
      goods:[fakeProductPage],
      product: fakeProductPage
    },
    MODAL_CALL: {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    },
    DATA_REVIEWS:{
      reviews:[fakeReview]
    },
    }));
    mockHistory.push(`/${AppRoute.Product}/${fakeProductPage.id}`);
    render(withStoreComponent);
    //expect(screen.getAllByText(fakeProductPage.name)).toBeInTheDocument();
    //expect(screen.getByText(fakeProductPage.previewImg)).toBeInTheDocument();
    //expect(screen.getByText(fakeProductPage.price)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    //expect(screen.getByText(fakeProductPage.description)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    //expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    //expect(screen.getByText(fakeReview.createAt)).toBeInTheDocument();
    //expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
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
