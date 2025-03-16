import { NameSpace } from '../const';
import {getReviews} from './selectors';
import { makeFakeReview } from '../../utils/mocks';


describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.ReviewsData]: {
      reviews: [makeFakeReview()],
    }
  };
  it('should return reviews', () => {
    const {reviews} = state[NameSpace.ReviewsData];
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });
});
