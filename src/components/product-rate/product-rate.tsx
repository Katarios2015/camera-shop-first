import { GoodType } from '../../types/good-type';
import { createStars, STARS_COUNT, StarIconUrl} from './common';

type ProductRatePropsType={
  good:GoodType;
}

function ProductRate(prop:ProductRatePropsType){
  const {good} = prop;
  const stars = createStars(STARS_COUNT, StarIconUrl.IconStar);
  const ratingStars = createStars(good.rating, StarIconUrl.IconFullStar);
  if(ratingStars){
    stars.splice(0,good.rating,...ratingStars);
  }
  return(
    <div className="rate product-card__rate">
      {stars.map((item)=>(
        <svg key={item.id} width={17} height={16} aria-hidden="true">
          <use xlinkHref={item.url} />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {good.rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{good.rating}</p>
    </div>
  );
}

export default ProductRate;
