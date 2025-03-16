import {makeFakeProductCard} from '../../utils/mocks';
import { goodsData } from './goods-data';
import { fetchDataGoods, fetchDataProductPage } from '../api-actions';

describe('goodsData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      goods: [],
      product: null
    };
    const result = goodsData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefiend state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      goods: [],
      product: null
    };
    const result = goodsData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "goods" to array with good with "fetchDataGoods.fulfilled"', () => {
    const mockProductCard = makeFakeProductCard();
    const expectedState = {
      goods: [mockProductCard],
      product: null
    };
    const result = goodsData.reducer(
      undefined,
      fetchDataGoods.fulfilled(
        [mockProductCard], '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should not set "goods" to array with good with "fetchDataGoods.rejected"', () => {
    const expectedState = {
      goods: [],
      product: null
    };
    const result = goodsData.reducer(
      undefined,
      fetchDataGoods.rejected
    );
    expect(result).toEqual(expectedState);
  });
  it('should set "product" to state with "fetchDataProductPage.fulfilled"', () => {
    const mockProductCard = makeFakeProductCard();
    const expectedState = {
      goods: [],
      product: mockProductCard
    };
    const result = goodsData.reducer(
      undefined,
      fetchDataProductPage.fulfilled(
        mockProductCard,'', mockProductCard.id,)
    );
    expect(result).toEqual(expectedState);
  });

  it('should not set "product" to state with "fetchDataProductPage.rejected"', () => {
    const expectedState = {
      goods: [],
      product: null
    };
    const result = goodsData.reducer(
      undefined,
      fetchDataProductPage.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
