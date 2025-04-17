import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { GoodsDataType } from '../../types/state-type';
import { fetchDataGoods, fetchDataProductPage } from '../api-actions';
import {toast} from 'react-toastify';

const initialState: GoodsDataType = {
  goods: [],
  filtredGoods:[],
  product: null,
  isReset: false
};

export const goodsData = createSlice({
  name: NameSpace.GoodsData,
  initialState: initialState,
  reducers: {
    filterGoods:(state, action: PayloadAction<GoodsDataType['filtredGoods']>) => {
      state.filtredGoods = action.payload;
    },
    resetFilters:(state, action: PayloadAction<GoodsDataType['isReset']>) => {
      state.isReset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataGoods.fulfilled, (state, action) => {
        state.goods = action.payload;
      })
      .addCase(fetchDataGoods.rejected, () => {
        toast.warn('Ошибка загрузки');
      })
      .addCase(fetchDataProductPage.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchDataProductPage.rejected, () => {
        toast.warn('Ошибка загрузки');
      });
  },
});

export const {filterGoods, resetFilters} = goodsData.actions;
