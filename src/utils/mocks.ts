import {datatype, image} from 'faker';
import { GoodType } from '../types/good-type';
import {Review} from '../types/review-type';
import { NewOrder } from '../types/order-type';

import { PromoSlideType } from '../types/promo-slide-type';

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State} from '../types/state-type';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;


export const makeFakeProductCard = ():GoodType =>({
  id: datatype.number(),
  name:  datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string() ,
  category: datatype.string(),
  description: datatype.string(),
  level: datatype.string(),
  price: datatype.number(),
  rating: datatype.number(),
  reviewCount: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakePromoCard = ():PromoSlideType =>({
  id: datatype.number(),
  name:  datatype.string(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});


export const makeFakeReview = ():Review =>({
  id: datatype.string(),
  createAt: datatype.string(),
  cameraId: datatype.number(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number(),
});

export const makeFakeNewOrder = ():NewOrder=> ({
  camerasIds: [datatype.number()],
  coupon: null,
  tel: datatype.number().toString(),
});


export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({

  DATA_GOODS: {
    goods:[],
    product: null,
    filtredGoods:[],
    isReset: false

  },
  MODAL_CALL: {
    isModalCallActive: false,
    activeGood: null,
  },
  DATA_REVIEWS:{
    reviews:[]
  },

  DATA_SLIDER:{
    promoSlides:[],
    similarGoods:[]
  },

  ...initialState ?? {},
});
