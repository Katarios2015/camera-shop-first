import {makeFakeProductCard, makeFakeNewOrder} from '../../utils/mocks';
import { modalCall, openModalCall, closeModalCall } from './modal-call';
import { postOrder } from '../api-actions';

describe('modalCall Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    };
    const result = modalCall.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefiend state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    };
    const result = modalCall.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFormDisabled" true with "postOrder.pending"', () => {
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: true
    };
    const result = modalCall.reducer(
      undefined,
      postOrder.pending(
        '', makeFakeNewOrder(), undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFormDisabled" false with "postOrder.fulfilled"', () => {
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    };
    const result = modalCall.reducer(
      undefined,
      postOrder.fulfilled(
        undefined , '', makeFakeNewOrder())
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFormDisabled" false with "postOrder.rejected"', () => {
    const expectedState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    };
    const result = modalCall.reducer(
      undefined,
      postOrder.rejected(
        null , '', makeFakeNewOrder())
    );
    expect(result).toEqual(expectedState);
  });

  it('openModalCall action: should return actual activeGood and  isModalCallActive=true', () => {
    const fakeProduct = makeFakeProductCard();

    const initialState = {
      isModalCallActive: false,
      activeGood: null,
      isFormDisabled: false
    };

    const expectedState = {
      isModalCallActive: true,
      activeGood: fakeProduct,
      isFormDisabled: false
    };
    const result = modalCall.reducer(initialState, openModalCall(fakeProduct));
    expect(result).toEqual(expectedState);
  });
  it('closeModalCall action: should return actual activeGood and  isModalCallActive=true', () => {
    const fakeProduct = makeFakeProductCard();

    const initialState = {
      isModalCallActive: true,
      activeGood: fakeProduct,
      isFormDisabled: false
    };

    const expectedState = {
      isModalCallActive: false,
      activeGood: fakeProduct,
      isFormDisabled: false
    };
    const result = modalCall.reducer(initialState, closeModalCall());
    expect(result).toEqual(expectedState);
  });
});
