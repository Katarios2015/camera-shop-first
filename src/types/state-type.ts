import { GoodType } from './good-type';
import { Review } from './review-type';
import {store} from '../store/index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type GoodsDataType = {
  goods:GoodType[];
  product: GoodType|null;
}

export type ModalCallType = {
  isModalCallActive: boolean;
  activeGood:GoodType|null;
}

export type ReviewsDataType = {
  reviews:Review[];
}
