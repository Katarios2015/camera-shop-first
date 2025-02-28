import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { GoodsDataType } from '../../types/state-type';
import { fetchDataGoods } from '../api-actions';

const initialState: GoodsDataType = {
  goods: [],
};

export const goodsData = createSlice({
  name: NameSpace.GoodsData,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataGoods.fulfilled, (state, action) => {
        state.goods = action.payload;
      });
  },
});

