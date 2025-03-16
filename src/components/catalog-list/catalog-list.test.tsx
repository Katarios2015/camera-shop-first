import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import CatalogList from './catalog-list';

describe('Component: CatalogList', () => {
  it('should render correctly', () => {
    const fakeProducts = [makeFakeProductCard()];
    const productCard = 'productCard';

    const { withStoreComponent } = withStore(<CatalogList/>, makeFakeStore(
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

    const cardsValues = screen.getAllByTestId(productCard);
    expect(cardsValues.length).toBe(fakeProducts.length);

  });
});
