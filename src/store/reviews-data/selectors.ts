import { NameSpace } from '../const';
import { Review } from '../../types/review-type';
import { State } from '../../types/state-type';

export const getReviews = (state:Pick<State, NameSpace.ReviewsData>):Review[]=>state[NameSpace.ReviewsData].reviews;
