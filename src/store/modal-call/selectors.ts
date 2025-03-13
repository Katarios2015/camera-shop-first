import { NameSpace } from '../const';
import { GoodType } from '../../types/good-type';
import { State } from '../../types/state-type';

export const getActiveGood = (state:Pick<State, NameSpace.ModalCall>):GoodType|null=>state[NameSpace.ModalCall].activeGood;

export const getIsModalCallActive = (state:Pick<State, NameSpace.ModalCall>):boolean=>state[NameSpace.ModalCall].isModalCallActive;

export const getDisabledFlag = (state:Pick<State, NameSpace.ModalCall>):boolean=>state[NameSpace.ModalCall].isFormDisabled;
