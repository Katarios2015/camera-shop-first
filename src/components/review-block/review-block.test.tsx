import {render, screen} from '@testing-library/react';


import {makeFakeStore, makeFakeReview} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

import ReviewBlock from './review-block';
import RatingStars from '../rating-stars/rating-stars';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';


describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    vi.mock('../rating-stars/rating-stars');
    const fakeReview = makeFakeReview();
    const fakeReviews = [fakeReview];

    const advantageId = 'advantage';
    const disadvantageId = 'disadvantage';
    const reviewTextId = 'reviewText';
    const reviewItemId = 'reviewItem';
    const userNameId = 'userName';
    const dateId = 'date';

    const buttonsBlockId = 'buttonsBlock';

    const { withStoreComponent } = withStore(<ReviewBlock reviews={fakeReviews}/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[],
        product: null,
        filtredGoods: [],
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: false,
        activeGood: null,
      },
      DATA_REVIEWS:{
        reviews:[fakeReview]
      },
      }
    ));

    dayjs.extend(localeData);
    dayjs().localeData();
    dayjs.extend(updateLocale);

    dayjs.updateLocale('ru', {
      months: [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
        'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ]
    });


    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const formatedFakeDate = dayjs(fakeReview.createAt).locale('ru').format('DD MMMM');
    const reviewItems = screen.getAllByTestId(reviewItemId);

    expect(RatingStars).toBeCalledTimes(reviewItems.length);
    expect(reviewItems.length).toBe(fakeReviews.length);

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();

    expect(screen.getByTestId(advantageId).textContent).toBe(fakeReview.advantage);
    expect(screen.getByTestId(disadvantageId).textContent).toBe(fakeReview.disadvantage);
    expect(screen.getByTestId(reviewTextId).textContent).toBe(fakeReview.review);
    expect(screen.getByTestId(userNameId).textContent).toBe(fakeReview.userName);
    expect(screen.getByTestId(buttonsBlockId).textContent).toBe('');
    expect(screen.getByTestId(dateId).textContent).toBe(formatedFakeDate);
  });

  it('should called mockHandle 1 time', async () => {
    const mockHandleClick = vi.fn();
    render(
      <button
        onClick={mockHandleClick}
        className="btn btn--purple" type="button"
      >Показать больше отзывов
      </button>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('should render reviews after click by moreButton', async () => {
    vi.mock('../rating-stars/rating-stars');
    const fakeReview = makeFakeReview();
    const fakeReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

    const reviewItemId = 'reviewItem';
    const buttonsBlockId = 'buttonsBlock';

    const { withStoreComponent } = withStore(<ReviewBlock reviews={fakeReviews}/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[],
        product: null,
        filtredGoods: [],
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: false,
        activeGood: null,
      },
      DATA_REVIEWS:{
        reviews:[fakeReview]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(buttonsBlockId).textContent).toBe('Показать больше отзывов');

    await userEvent.click(screen.getByRole('button'));
    const reviewItems = screen.getAllByTestId(reviewItemId);
    expect(reviewItems.length).toBe(fakeReviews.length);
    expect(screen.getByTestId(buttonsBlockId).textContent).toBe('');
  });


  it('should render reviews after scroll', () => {
    vi.mock('../rating-stars/rating-stars');
    const fakeReview = makeFakeReview();
    const fakeReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

    const reviewItemId = 'reviewItem';
    const buttonsBlockId = 'buttonsBlock';

    const { withStoreComponent } = withStore(<ReviewBlock reviews={fakeReviews}/>, makeFakeStore(
      {DATA_GOODS: {
        goods:[],
        product: null,
        filtredGoods: [],
        isReset:false
      },
      MODAL_CALL: {
        isModalCallActive: false,
        activeGood: null,
      },
      DATA_REVIEWS:{
        reviews:[fakeReview]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(buttonsBlockId).textContent).toBe('Показать больше отзывов');
    const windowHeight = document.body.clientHeight;

    fireEvent.scroll(document,{target:{scrollY:windowHeight}});

    const reviewItems = screen.getAllByTestId(reviewItemId);

    expect(reviewItems.length).toBe(fakeReviews.length);
    expect(screen.getByTestId(buttonsBlockId).textContent).toBe('');
  });
});

