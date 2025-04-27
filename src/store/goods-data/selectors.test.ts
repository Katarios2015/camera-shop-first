import { NameSpace } from '../const';
import { getGoods, getProduct,getFiltredGoods } from './selectors';
import { makeFakeProductCard } from '../../utils/mocks';


describe('GoodsData selectors', () => {
  const state = {
    [NameSpace.GoodsData]: {
      goods: [makeFakeProductCard()],
      product: makeFakeProductCard(),
      filtredGoods: [makeFakeProductCard()],
      isReset:false
    }
  };
  it('should return product', () => {
    const {product} = state[NameSpace.GoodsData];
    const result = getProduct(state);
    expect(result).toBe(product);
  });
  it('should return goods', () => {
    const {goods} = state[NameSpace.GoodsData];
    const result = getGoods(state);
    expect(result).toBe(goods);
  });
  it('should return filtredGoods', () => {
    const {filtredGoods} = state[NameSpace.GoodsData];
    const result = getFiltredGoods(state);
    expect(result).toBe(filtredGoods);
  });
});
