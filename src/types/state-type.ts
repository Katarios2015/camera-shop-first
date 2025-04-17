import { GoodType } from './good-type';
import { Review } from './review-type';
import {store} from '../store/index';
import { PromoSlideType } from './promo-slide-type';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type GoodsDataType = {
  goods:GoodType[];
  filtredGoods:GoodType[];
  product: GoodType|null;
  isReset: boolean;
}

export type SortType = {
  sortTypeName: string;
  sortDirection: string;
}

export type ModalCallType = {
  isModalCallActive: boolean;
  activeGood:GoodType|null;
}

export type ReviewsDataType = {
  reviews:Review[];
}

export type PromoSliderData = {
  promoSlides:PromoSlideType[];
  similarGoods:GoodType[];
}
