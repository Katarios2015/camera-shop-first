import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../store/const';
import { ModalCallType } from '../../types/state-type';

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
});

export const {openModalCall, closeModalCall} = modalCall.actions;

