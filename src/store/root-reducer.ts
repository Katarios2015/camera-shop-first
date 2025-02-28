import { NameSpace } from './const';
import {combineReducers} from '@reduxjs/toolkit';
import { goodsData } from './goods-data/goods-data';
import { modalCall } from './modal-call/modal-call';


export const rootReducer = combineReducers({
  [NameSpace.GoodsData]:goodsData.reducer,
  [NameSpace.ModalCall]:modalCall.reducer,
}
);
