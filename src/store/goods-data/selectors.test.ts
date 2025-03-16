import { NameSpace } from '../const';
import { getGoods, getProduct } from './selectors';
import { makeFakeProductCard } from '../../utils/mocks';


describe('GoodsData selectors', () => {
  const state = {
    [NameSpace.GoodsData]: {
      goods: [makeFakeProductCard()],
      product: makeFakeProductCard()
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
});
