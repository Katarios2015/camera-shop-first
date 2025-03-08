import { createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { ApiRoute } from './const';
import { GoodType } from '../types/good-type';
import { Review } from '../types/review-type';
import {State, AppDispatch} from '../types/state-type';

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
  'data/goods',
  async (id, {extra:api}) => {
    const response = await api.get<Review[]>(`${ApiRoute.Cameras}/${id}/${ApiRoute.Reviews}`);
    return response.data;
  },
);
