import { createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { ApiRoute } from './const';
import { GoodType } from '../types/good-type';
import { PromoSlideType } from '../types/promo-slide-type';
import { Review } from '../types/review-type';
import {State, AppDispatch} from '../types/state-type';
import { NewOrder } from '../types/order-type';

export const fetchDataGoods = createAsyncThunk<GoodType[], undefined,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'data/goods',
  async (_arg, {extra:api}) => {
    const response = await api.get<GoodType[]>(ApiRoute.Cameras);
    return response.data;
  },
);

export const fetchDataProductPage = createAsyncThunk<GoodType, number,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'data/product',
  async (id, {extra:api}) => {
    const response = await api.get<GoodType>(`${ApiRoute.Cameras}/${id}`);
    return response.data;
  },
);

export const fetchDataReviews = createAsyncThunk<Review[], number,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'data/reviews',
  async (id, {extra:api}) => {
    const response = await api.get<Review[]>(`${ApiRoute.Cameras}/${id}/${ApiRoute.Reviews}`);
    return response.data;
  },
);

export const postOrder = createAsyncThunk<void, NewOrder,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'product/order',
  async ({camerasIds, coupon, tel}, {extra:api}) => {
    await api.post<NewOrder>(ApiRoute.Orders, {camerasIds, coupon,tel});
  },
);


export const fetchDataPromoSlides = createAsyncThunk<PromoSlideType[], undefined,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'data/promoSlides',
  async (_arg, {extra:api}) => {
    const response = await api.get<PromoSlideType[]>(ApiRoute.Promo);
    return response.data;
  },
);

export const fetchDataSimilarGoods = createAsyncThunk<GoodType[], number,{
  dispatch:AppDispatch;
  getState: State;
  extra: AxiosInstance;
}>(
  'data/similarGoods',
  async (id, {extra:api}) => {
    const response = await api.get<GoodType[]>(`${ApiRoute.Cameras}/${id}/${ApiRoute.Similar}`);
    return response.data;
  },
);
