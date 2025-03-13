import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { ReviewsDataType } from '../../types/state-type';
import { fetchDataReviews} from '../api-actions';

const initialState:ReviewsDataType = {
  reviews: [],
};

export const reviewsData = createSlice({
  name: NameSpace.ReviewsData,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataReviews.fulfilled, (state, action) => {
        state.reviews =
        action.payload.sort((a,b)=>new Date(b.createAt).getTime()
        - new Date(a.createAt).getTime());
      });
  },
});

