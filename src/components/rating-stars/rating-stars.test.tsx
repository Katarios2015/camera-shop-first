import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard, makeFakeReview} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import RatingStars from './rating-stars';
import { STARS_COUNT } from './common';
describe('Component: RatingStars', () => {
  it('should render correctly with isReview=false', () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProductCard = makeFakeProductCard();

    const starSvgId = 'starSvg';
    const rateCountId = 'rateCount';
    const starsContainerId = 'starsContainer';

    const { withStoreComponent } = withStore(<RatingStars item={fakeProductCard} isReview={false}/>, makeFakeStore(
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

    const stars = screen.getAllByTestId(starSvgId);
    expect(stars.length).toBe(STARS_COUNT);
    expect(screen.getByTestId(rateCountId).textContent).toBe(`Всего оценок:${fakeProductCard.rating}`);
    expect(screen.getByTestId(starsContainerId)).toHaveClass('rate product-card__rate');
  });
  it('should render correctly with isReview=true', () => {
    const fakeReview = makeFakeReview();
    const fakeProducts = [makeFakeProductCard()];

    const starSvgId = 'starSvg';
    const rateCountId = 'rateCount';
    const starsContainerId = 'starsContainer';

    const { withStoreComponent } = withStore(<RatingStars item={fakeReview} isReview/>, makeFakeStore(
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
        reviews:[fakeReview]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const stars = screen.getAllByTestId(starSvgId);

    expect(stars.length).toBe(STARS_COUNT);
    expect(screen.getByTestId(rateCountId).textContent).toBe(`Оценка: ${fakeReview.rating}`);

    expect(screen.getByTestId(starsContainerId)).toHaveClass('rate review-card__rate');
  });
});
