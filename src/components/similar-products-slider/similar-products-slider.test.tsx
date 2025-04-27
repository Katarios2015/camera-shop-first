import {fireEvent, render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import SimilarProductSlider from './similar-product-slider';

describe('Component: SimilarProductSlider', () => {
  it('should render correctly', () => {

    const fakeProducts = [makeFakeProductCard(), makeFakeProductCard(), makeFakeProductCard(),makeFakeProductCard(),makeFakeProductCard(),makeFakeProductCard()];

    const productCardId = 'productCard';

    const { withStoreComponent } = withStore(<SimilarProductSlider similarGoods={fakeProducts}/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[],
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
      DATA_SLIDER:{
        promoSlides:[],
        similarGoods:fakeProducts
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(screen.getAllByTestId(productCardId).length).toBe(fakeProducts.length);
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });

  it('should called handles 1 time each', () => {
    const handleNextButtonClick = vi.fn();
    const handlePrevButtonClick = vi.fn();
    render(
      <>
        <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onMouseDown={handlePrevButtonClick}>
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onMouseDown={handleNextButtonClick}>
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </>
    );

    const nextButton = screen.getByLabelText('Следующий слайд');
    fireEvent.mouseDown(nextButton);
    expect(handleNextButtonClick).toBeCalledTimes(1);
    const prevButton = screen.getByLabelText('Предыдущий слайд');
    fireEvent.mouseDown(prevButton);
  });

});
