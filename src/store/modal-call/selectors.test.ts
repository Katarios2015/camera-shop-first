import { NameSpace } from '../const';
import { getActiveGood, getIsModalCallActive} from './selectors';
import {makeFakeProductCard} from '../../utils/mocks';

describe('ModalCall selectors', () => {
  const state = {
    [NameSpace.ModalCall]: {
      isModalCallActive: true,
      activeGood: makeFakeProductCard(),
      isFormDisabled: false
    }
  };
  it('should return product', () => {
    const {activeGood} = state[NameSpace.ModalCall];
    const result = getActiveGood(state);
    expect(result).toBe(activeGood);
  });
  it('should return isModalCallActive', () => {
    const {isModalCallActive} = state[NameSpace.ModalCall];
    const result = getIsModalCallActive(state);
    expect(result).toBe(isModalCallActive);
  });
});
