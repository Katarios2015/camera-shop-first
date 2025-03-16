import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import ProductCard from './product-card';
import RatingStars from '../rating-stars/rating-stars';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    vi.mock('../rating-stars/rating-stars');
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();

    const imageId = 'image';
    const productCardPriceId = 'productCardPrice';
    const productTitleId = 'productTitle';


    const { withStoreComponent } = withStore(<ProductCard good={fakeProduct}/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
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
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const image = screen.getByTestId(imageId);

    expect(image).toBeInTheDocument();
    expect(RatingStars).toBeCalledTimes(1);

    expect(screen.getByTestId(productCardPriceId).textContent).toBe(`Цена:${fakeProduct.price} ₽`);
    expect(screen.getByTestId(productTitleId).textContent).toBe(fakeProduct.name);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
