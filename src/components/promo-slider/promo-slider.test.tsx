import {render} from '@testing-library/react';

import {makeFakeStore, makeFakePromoCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import PromoSlider from './promo-slider';
import SlideContent from '../slide-content/slide-content';
describe('Component: PromoSlider', () => {
  it('should render correctly', () => {
    vi.mock('../slide-content/slide-content');

    const fakePromos = [makeFakePromoCard(), makeFakePromoCard(),makeFakePromoCard(), makeFakePromoCard()];

    const { withStoreComponent } = withStore(<PromoSlider/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[],
        product: null
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
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(SlideContent).toHaveBeenCalledTimes(fakePromos.length);
  });
});
