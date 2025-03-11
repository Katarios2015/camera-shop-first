import { GoodType } from '../../types/good-type';
import { Review } from '../../types/review-type';
import { createStars, STARS_COUNT, StarIconUrl} from './common';

type RatingStarsPropsType={
  item:GoodType|Review;
  isReview : boolean;
}

function RatingStars(prop:RatingStarsPropsType){
  const {item, isReview} = prop;
  const stars = createStars(STARS_COUNT, StarIconUrl.IconStar);
  const ratingStars = createStars(item.rating, StarIconUrl.IconFullStar);
  if(ratingStars){
    stars.splice(0,item.rating,...ratingStars);
  }
  return(
    <div className={isReview ? 'rate review-card__rate' : 'rate product-card__rate'}>
      {stars.map((star)=>(
        <svg key={star.id} width={17} height={16} aria-hidden="true">
          <use xlinkHref={star.url} />
        </svg>
      ))}
      {isReview ?
        <p className="visually-hidden">Оценка: {item.rating}</p>
        :
        <>
          <p className="visually-hidden">Рейтинг: {item.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{item.rating}</p>
        </>}
    </div>
  );
}

export default RatingStars;
