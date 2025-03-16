import { useState } from 'react';
import { Review } from '../../types/review-type';
import RatingStars from '../rating-stars/rating-stars';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

type ReviewsProps={
  reviews: Review[];
}

dayjs.extend(localeData);
dayjs().localeData();
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  months: [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ]
});

function ReviewBlock(props:ReviewsProps){
  const {reviews} = props;
  const STEP = 3;

  const [reviewsVisibleCount, setReviewsVisibleCount] = useState(STEP);
  const slicedReviews = reviews.slice(0,reviewsVisibleCount);

  const handleMoreButtonClick = ()=>{
    setReviewsVisibleCount(reviewsVisibleCount + STEP);
  };
  return(
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
          </div>
          <ul className="review-block__list">
            { slicedReviews.map((review)=>(
              <li key={review.id} className="review-card" data-testid='reviewItem'>
                <div className="review-card__head">
                  <p className="title title--h4" data-testid='userName'>{review.userName}</p>
                  <time className="review-card__data" dateTime={review.createAt.toString()} data-testid='date'>
                    {dayjs(review.createAt).locale('ru').format('DD MMMM')}
                  </time>
                </div>
                <RatingStars item={review} isReview/>
                <ul className="review-card__list">
                  <li className="item-list"><span className="item-list__title">Достоинства:</span>
                    <p className="item-list__text" data-testid='advantage'>{review.advantage}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Недостатки:</span>
                    <p className="item-list__text" data-testid='disadvantage'>{review.disadvantage}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Комментарий:</span>
                    <p className="item-list__text" data-testid='reviewText'>{review.review}</p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <div className="review-block__buttons" data-testid='buttonsBlock'>
            {(slicedReviews.length === reviews.length || reviews.length < STEP) ? ''
              :
              <button
                onClick={handleMoreButtonClick}
                className="btn btn--purple" type="button"
              >Показать больше отзывов
              </button>}
          </div>
        </div>
      </section>
    </div>
  );
}
export default ReviewBlock;
