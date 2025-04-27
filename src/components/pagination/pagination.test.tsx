import {fireEvent, render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import { GoodType } from '../../types/good-type';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly with fakeData length=50', () => {
    const fakeProducts:GoodType[] = new Array(50).fill(makeFakeProductCard()) as GoodType[];
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<Pagination/>, makeFakeStore(
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
    const activePage = screen.getByText('1');
    expect(activePage).toHaveClass('pagination__link--active');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });
  it('should not render when filtered goods count is less than or equal to PER_PAGE_GOODS_COUNT', () => {
    const fakeProducts:GoodType[] = new Array(9).fill(makeFakeProductCard()) as GoodType[];
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<Pagination/>, makeFakeStore(
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

    expect(null);
  });

  it('should render correctly with event click forward', () => {
    const fakeProducts:GoodType[] = new Array(50).fill(makeFakeProductCard()) as GoodType[];
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<Pagination/>, makeFakeStore(
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

    const forwardLink = screen.getByText('Далее');
    fireEvent.click(forwardLink);

    const activePage = screen.getByText('4');
    expect(activePage).toHaveClass('pagination__link--active');

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });

  it('should render correctly with event click forward than backward', () => {
    const fakeProducts:GoodType[] = new Array(50).fill(makeFakeProductCard()) as GoodType[];
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<Pagination/>, makeFakeStore(
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

    const forwardLink = screen.getByText('Далее');
    fireEvent.click(forwardLink);

    const backwardLink = screen.getByText('Назад');
    fireEvent.click(backwardLink);
    const activePage = screen.getByText('2');
    expect(activePage).toHaveClass('pagination__link--active');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });

  it('should render active class correctly with event click to page item', () => {
    const fakeProducts:GoodType[] = new Array(50).fill(makeFakeProductCard()) as GoodType[];
    const fakeProduct = makeFakeProductCard();

    const { withStoreComponent } = withStore(<Pagination/>, makeFakeStore(
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

    const activePage = screen.getByText('2');
    fireEvent.click(activePage);

    expect(activePage).toHaveClass('pagination__link--active');

  });

});

