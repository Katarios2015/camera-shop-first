import { GoodType } from '../../types/good-type';
import { Review } from '../../types/review-type';
import { createStars} from './common';

type RatingStarsPropsType={
  item:GoodType|Review;
  isReview : boolean;
}

function RatingStars(prop:RatingStarsPropsType){
  const {item, isReview} = prop;
  const stars = createStars(item.rating);

  return(
    <div className={isReview ? 'rate review-card__rate' : 'rate product-card__rate'} data-testid='starsContainer'>
      {stars.map((star)=>(
        <svg key={star.id} width={17} height={16} aria-hidden="true" data-testid='starSvg'>
          <use xlinkHref={star.url} />
        </svg>
      ))}
      {isReview ?
        <p className="visually-hidden" data-testid='rateCount'>Оценка: {item.rating}</p>
        :
        <>
          <p className="visually-hidden">Рейтинг: {item.rating}</p>
          <p className="rate__count" data-testid='rateCount'><span className="visually-hidden">Всего оценок:</span>{item.rating}</p>
        </>}
    </div>
  );
}

export default RatingStars;
