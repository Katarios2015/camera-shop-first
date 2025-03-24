import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { ModalCallType } from '../../types/state-type';
import { postOrder } from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ModalCallType = {
  isModalCallActive: false,
  activeGood: null,
};

export const modalCall = createSlice({
  name: NameSpace.ModalCall,
  initialState: initialState,
  reducers: {
    openModalCall:(state, action: PayloadAction<ModalCallType['activeGood']>) => {
      state.isModalCallActive = true;
      state.activeGood = action.payload;
    },
    closeModalCall:(state) => {
      state.isModalCallActive = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.rejected, () => {
        toast.warn('Ошибка отправки формы, попробуйте позже');
      });
  },
});

export const {openModalCall, closeModalCall} = modalCall.actions;

