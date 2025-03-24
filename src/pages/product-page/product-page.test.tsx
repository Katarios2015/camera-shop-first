import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';

import ProductPage from './product-page';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewBlock from '../../components/review-block/review-block';
import RatingStars from '../../components/rating-stars/rating-stars';
import { Link } from 'react-router-dom';

describe('Component: ProductPage', () => {

  it('should render correctly', () => {
    vi.mock('../../components/breadcrumbs/breadcrumbs');
    vi.mock('../../components/review-block/review-block');
    vi.mock('../../components/rating-stars/rating-stars');
    const fakeProduct = makeFakeProductCard();
    const descriptionContainerId = 'description';

    const { withStoreComponent } = withStore(<ProductPage/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[fakeProduct],
        product: fakeProduct,
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

    const descriptionContainer = screen.getByTestId(descriptionContainerId);

    expect(BreadCrumbs).toBeCalledTimes(1);
    expect(ReviewBlock).toBeCalledTimes(1);
    expect(RatingStars).toBeCalledTimes(1);
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(/Категория:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.category)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.type)).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.level)).toBeInTheDocument();
    expect(descriptionContainer.textContent).toBe(fakeProduct.description);
  });
  it('should called mockHandle 1 time', async () => {
    const mockHandleClick = vi.fn();
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(
      <Link onClick={mockHandleClick} className="up-btn" to='/#header' data-testid='upButton'>
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </Link>,
      makeFakeStore(
        {DATA_GOODS: {
          goods:[fakeProduct],
          product: fakeProduct,
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

    await userEvent.click(screen.getByRole('link'));
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('tabElement should have another className whit click to propertyButton', async () => {

    const fakeProduct = makeFakeProductCard();
    const propertyButtonId = 'propertyButton';
    const tabElementId = 'tabElement';

    const { withStoreComponent } = withStore(<ProductPage/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[fakeProduct],
        product: fakeProduct,
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

    const propertyButton = screen.getByTestId(propertyButtonId);
    const tabElement = screen.getByTestId(tabElementId);

    await userEvent.click(propertyButton);
    expect(tabElement).toHaveClass('tabs__element is-active');

  });
  it('tabElement should have another className whit click to descriptionButton', async () => {

    const fakeProduct = makeFakeProductCard();

    const descriptionButtonId = 'descriptionButton';
    const tabElementId = 'tabElement';

    const { withStoreComponent } = withStore(<ProductPage/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[fakeProduct],
        product: fakeProduct,
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

    const descriptionButton = screen.getByTestId(descriptionButtonId);
    const tabElement = screen.getByTestId(tabElementId);

    await userEvent.click(descriptionButton);
    expect(tabElement).toHaveClass('tabs__element is-active');
  });
});
