import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { fetchDataPromoSlides, fetchDataSimilarGoods } from '../api-actions';
import { PromoSliderData } from '../../types/state-type';
const initialState:PromoSliderData = {
  promoSlides:[],
  similarGoods:[]
};

export const sliderData = createSlice({
  name: NameSpace.SliderData,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataPromoSlides.fulfilled, (state, action) => {
        state.promoSlides = action.payload;
      })
      .addCase(fetchDataSimilarGoods.fulfilled, (state, action) => {
        state.similarGoods = action.payload;
      });
  },
});

