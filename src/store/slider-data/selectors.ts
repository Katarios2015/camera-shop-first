import { NameSpace } from '../const';
import { PromoSlideType } from '../../types/promo-slide-type';
import { GoodType } from '../../types/good-type';
import { State } from '../../types/state-type';

export const getPromoSlides = (state:Pick<State, NameSpace.SliderData>):PromoSlideType[]=>state[NameSpace.SliderData].promoSlides;

export const getSimilarGoods = (state:Pick<State, NameSpace.SliderData>):GoodType[]=>state[NameSpace.SliderData].similarGoods;
