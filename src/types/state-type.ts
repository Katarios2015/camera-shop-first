import { GoodType } from './good-type';
import {store} from '../store/index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type GoodsDataType = {
goods:GoodType[];
}

export type ModalCallType = {
  isModalCallActive: boolean;
  activeGood:GoodType|null;
}
