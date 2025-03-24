import {makeFakeProductCard} from '../../utils/mocks';
import { modalCall, openModalCall, closeModalCall } from './modal-call';

describe('modalCall Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
    };
    const result = modalCall.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefiend state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
    };
    const result = modalCall.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('openModalCall action: should return actual activeGood and  isModalCallActive=true', () => {
    const fakeProduct = makeFakeProductCard();

    const initialState = {
      isModalCallActive: false,
      activeGood: null,
    };

    const expectedState = {
      isModalCallActive: true,
      activeGood: fakeProduct,
    };
    const result = modalCall.reducer(initialState, openModalCall(fakeProduct));
    expect(result).toEqual(expectedState);
  });
  it('closeModalCall action: should return actual activeGood and  isModalCallActive=true', () => {
    const fakeProduct = makeFakeProductCard();

    const initialState = {
      isModalCallActive: true,
      activeGood: fakeProduct,
    };

    const expectedState = {
      isModalCallActive: false,
      activeGood: fakeProduct,
    };
    const result = modalCall.reducer(initialState, closeModalCall());
    expect(result).toEqual(expectedState);
  });
});
