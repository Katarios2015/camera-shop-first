import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { ReviewsDataType } from '../../types/state-type';
import { fetchDataReviews} from '../api-actions';

const initialState:ReviewsDataType = {
  reviews: [],
};

export const reviewsData = createSlice({
  name: NameSpace.GoodsData,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

