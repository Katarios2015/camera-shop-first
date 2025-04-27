import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component';
import PriceFilter from './price-filter';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';

describe('PriceFilter component', () => {
  it('should render correctly with default props', () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();
    const minInputId = 'inputMin';
    const maxInputId = 'inputMax';

    const { withStoreComponent } = withStore(<PriceFilter/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
        filtredGoods: fakeProducts,
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const minInput = screen.getByTestId(minInputId);
    const maxInput = screen.getByTestId(maxInputId);

    expect(minInput.getAttribute('placeholder')).toBe(`${fakeProducts[0].price}`);
    expect(maxInput.getAttribute('placeholder')).toBe(`${fakeProducts[0].price}`);
  });

  it('should update minimum price value on input change', () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();
    const minInputId = 'inputMin';

    const { withStoreComponent } = withStore(<PriceFilter/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
        filtredGoods: fakeProducts,
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const minInput = screen.getByTestId(minInputId);

    fireEvent.change(minInput, { target: { value: '150' } });
    expect(minInput).toHaveProperty('value', '150');
  });

  it('should update maximum price value on input change', () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();
    const maxInputId = 'inputMax';

    const { withStoreComponent } = withStore(<PriceFilter/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
        filtredGoods: fakeProducts,
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const maxInput = screen.getByTestId(maxInputId);
    fireEvent.change(maxInput, { target: { value: '250' } });
    expect(maxInput).toHaveProperty('value','250');
  });
});
