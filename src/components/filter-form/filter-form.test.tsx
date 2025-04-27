import { describe, it, expect} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';

import FilterForm from './filter-form';
import { extractActionsTypes } from '../../utils/mocks';
import { resetFilters } from '../../store/goods-data/goods-data';

describe('Component: FilterForm', () => {
  it('renders correctly', () => {
    const fakeProducts = [makeFakeProductCard()];
    const { withStoreComponent } = withStore(<FilterForm/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: null,
        filtredGoods: fakeProducts,
        isReset:false
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

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });

  it('handles reset button click correctly', () => {

    const fakeProducts = [makeFakeProductCard()];
    const { withStoreComponent, mockStore } = withStore(<FilterForm/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: null,
        filtredGoods: fakeProducts,
        isReset:false
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

    const resetButton = screen.getByText('Сбросить фильтры');
    fireEvent.click(resetButton);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      resetFilters.type
    ]);

  });

});
