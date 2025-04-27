import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakePromoCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import SlideContent from './slide-content';

describe('Component: SlideContent', () => {
  it('should render correctly', () => {
    const fakePromos = [makeFakePromoCard()];
    const fakePromo = makeFakePromoCard();

    const slideImageId = 'slideImage';
    const productNameId = 'productName';
    const altBannerText = 'баннер';

    const { withStoreComponent } = withStore(<SlideContent item={fakePromo}/>, makeFakeStore(
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
        promoSlides:fakePromos,
        similarGoods:[]
      }
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const image = screen.getByTestId(slideImageId);

    expect(image).toBeInTheDocument();
    expect(screen.getByAltText(altBannerText)).toBeInTheDocument();

    expect(screen.getByTestId(productNameId).textContent).toBe(fakePromo.name);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();
  });
});
