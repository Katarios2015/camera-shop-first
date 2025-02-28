import { NameSpace } from '../const';
import { GoodType } from '../../types/good-type';
import { State } from '../../types/state-type';

export const getGoods = (state:Pick<State, NameSpace.GoodsData>):GoodType[]=>state[NameSpace.GoodsData].goods;
