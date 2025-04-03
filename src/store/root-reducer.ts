import { NameSpace } from './const';
import {combineReducers} from '@reduxjs/toolkit';
import { goodsData } from './goods-data/goods-data';
import { reviewsData } from './reviews-data/reviews-data';
import { modalCall } from './modal-call/modal-call';
import { sliderData } from './slider-data/slider-data';

export const rootReducer = combineReducers({
  [NameSpace.GoodsData]:goodsData.reducer,
  [NameSpace.ModalCall]:modalCall.reducer,
  [NameSpace.ReviewsData]:reviewsData.reducer,
  [NameSpace.SliderData]: sliderData.reducer,
});
