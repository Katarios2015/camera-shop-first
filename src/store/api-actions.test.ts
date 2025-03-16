import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeProductCard, makeFakeReview, makeFakeNewOrder} from '../utils/mocks.js';

import {State} from '../types/state-type';
import {fetchDataGoods, fetchDataProductPage, fetchDataReviews, postOrder} from './api-actions';

import {ApiRoute} from '../store/const';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA_GOODS: { goods: [], product: null }});
  });

  describe('fetchGoodsAction', () => {
    it('should dispatch "fetchDataGoods.pending", "fetchDataGoods.fulfilled", when server response 200', async() => {
      const mockGoods = [makeFakeProductCard()];

      mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(200, mockGoods);
      await store.dispatch(fetchDataGoods());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchDataGoodsFulfilled = emittedActions.at(-1) as ReturnType<typeof fetchDataGoods.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDataGoods.pending.type,
        fetchDataGoods.fulfilled.type,
      ]);
      expect(fetchDataGoodsFulfilled.payload)
        .toEqual(mockGoods);
    });
    it('should dispatch "fetchDataGoods.pending", "fetchDataGoods.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(400, []);

      await store.dispatch(fetchDataGoods());

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchDataGoods.pending.type,
        fetchDataGoods.rejected.type,
      ]);
    });
  });

  describe('fetchDataProductPage', () => {
    it('should dispatch "fetchDataProductPage.pending", "fetchDataProductPage.fulfilled", when server response 200', async() => {
      const mockProduct = makeFakeProductCard();
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${mockProduct.id}`).reply(200, mockProduct);

      await store.dispatch(fetchDataProductPage(mockProduct.id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferPageActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDataProductPage.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDataProductPage.pending.type,
        fetchDataProductPage.fulfilled.type,
      ]);
      expect(fetchOfferPageActionFulfilled.payload)
        .toEqual(mockProduct);
    });
    it('should dispatch "fetchDataProductPage.pending", "fetchDataProductPage.rejected" when server response 400', async () => {
      const mockProduct = makeFakeProductCard();
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${mockProduct.id}`).reply(400, mockProduct);

      await store.dispatch(fetchDataProductPage(mockProduct.id));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchDataProductPage.pending.type,
        fetchDataProductPage.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchDataReviews.pending", "fetchDataReviews.fulfilled", when server response 200', async() => {
      const mockReview = makeFakeReview();
      const mockReviews = [mockReview];

      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${mockReview.cameraId}/${ApiRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchDataReviews(mockReview.cameraId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchDataReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDataReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDataReviews.pending.type,
        fetchDataReviews.fulfilled.type,
      ]);
      expect(fetchDataReviewsFulfilled.payload)
        .toEqual(mockReviews);
    });
    it('should dispatch "fetchDataReviews.pending", "fetchDataReviews.rejected" when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${mockReview.cameraId}`).reply(400, []);

      await store.dispatch(fetchDataReviews(mockReview.cameraId));

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchDataReviews.pending.type,
        fetchDataReviews.rejected.type,
      ]);
    });
  });
  describe('postOrderAction', () => {
    it('should dispatch "postOrder.pending", "postOrder.fulfilled" when server response 200', async() => {

      const fakeOrder = makeFakeNewOrder();

      mockAxiosAdapter.onPost(ApiRoute.Orders).reply(200, []);

      await store.dispatch(postOrder(fakeOrder));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrder.pending.type,
        postOrder.fulfilled.type,
      ]);
    });
  });


});
