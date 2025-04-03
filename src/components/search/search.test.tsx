import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Search from './search';
import { GoodType } from '../../types/good-type';
import {makeFakeStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';

describe('Search Component', () => {

  const mockGoods: GoodType[] = [
    { id: 1, name: 'Camera Pro', vendorCode: 'CP123', type: 'Camera', category: 'Photography', description: '', level: '', price: 0, rating: 0, reviewCount: 0, previewImg: '', previewImg2x: '', previewImgWebp: '', previewImgWebp2x: '' },
    { id: 2, name: 'Lens Zoom', vendorCode: 'LZ456', type: 'Lens', category: 'Photography', description: '', level: '', price: 0, rating: 0, reviewCount: 0, previewImg: '', previewImg2x: '', previewImgWebp: '', previewImgWebp2x: '' },
    { id: 3, name: 'Professional Camera', vendorCode: 'PC789', type: 'Camera', category: 'Photography', description: '', level: '', price: 0, rating: 0, reviewCount: 0, previewImg: '', previewImg2x: '', previewImgWebp: '', previewImgWebp2x: '' },
  ];

  it('renders the search input and icon', () => {
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('does not show search results when input has less than 3 characters', () => {
    const selectListId = 'selectList';
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 'ca' } });

    const resultsList = screen.getByTestId(selectListId);
    expect(resultsList).toHaveStyle({ visibility: 'hidden', opacity: '0' });
  });

  it('shows search results when input has 3 or more characters', () => {
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 'cam' } });

    const resultsList = screen.getByRole('list');
    expect(resultsList).toHaveStyle({ visibility: 'visible', opacity: '1' });
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });

  it('filters goods correctly based on search input', () => {
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 'camera' } });

    expect(screen.getByText('Camera Pro')).toBeInTheDocument();
    expect(screen.getByText('Professional Camera')).toBeInTheDocument();
    expect(screen.queryByText('Lens Zoom')).not.toBeInTheDocument();
  });

  it('shows reset button when there is input one symbol', () => {
    const resetButtonId = 'resetButton';
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 't' } });

    const resetButton = screen.getByTestId(resetButtonId);
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveStyle({ display: 'block' });
  });

  it('hides reset button when there is no input', () => {
    const resetButtonId = 'resetButton';
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const resetButton = screen.getByTestId(resetButtonId);
    expect(resetButton).toHaveStyle({ display: 'none' });
  });

  it('clears input and results when reset button is clicked', async() => {
    const resetButtonId = 'resetButton';
    const selectListId = 'selectList';
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 'camera' } });
    const resetButton = screen.getByTestId(resetButtonId);

    await userEvent.click(resetButton);
    expect(input.textContent).toBe('');

    const resultsList = screen.getByTestId(selectListId);
    expect(resultsList).toHaveStyle({ visibility: 'hidden', opacity: '0' });
  });

  it('renders correct links for search results', () => {
    const { withStoreComponent } = withStore(<Search/>, makeFakeStore(
      {DATA_GOODS: {
        goods:mockGoods,
        product: null
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

    const input = screen.getByPlaceholderText('Поиск по сайту');
    fireEvent.input(input, { target: { value: 'camera' } });

    const resultLinks = screen.getAllByRole('link');
    expect(resultLinks[0]).toHaveAttribute('href', '/camera/1');
    expect(resultLinks[1]).toHaveAttribute('href', '/camera/3');
  });
});
