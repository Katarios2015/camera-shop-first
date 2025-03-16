import {makeFakeReview} from '../../utils/mocks';
import { reviewsData } from './reviews-data';
import { fetchDataReviews } from '../api-actions';

describe('reviewsData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
    };
    const result = reviewsData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefiend state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
    };
    const result = reviewsData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with "fetchDataReviews.fulfilled"', () => {
    const fakeReview = makeFakeReview();
    const expectedState = {
      reviews: [fakeReview],
    };
    const result = reviewsData.reducer(
      undefined,
      fetchDataReviews.fulfilled(
        [fakeReview], '', fakeReview.cameraId)
    );
    expect(result).toEqual(expectedState);
  });

  it('should not set "reviews" to array with "fetchDataReviews.rejected"', () => {
    const expectedState = {
      reviews: [],
    };
    const result = reviewsData.reducer(
      undefined,
      fetchDataReviews.rejected
    );
    expect(result).toEqual(expectedState);
  });
});
