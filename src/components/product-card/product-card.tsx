import { Link } from 'react-router-dom';
import { GoodType } from '../../types/good-type';
import { createStars } from './common';

import {useAppDispatch} from '../hooks/index-hook';
import { openModalCall } from '../../store/modal-call/modal-call';


type ProductCardPropsType={
  good:GoodType;
}

const STARS_COUNT = 5;
const enum StarIconUrl {
  IconStar = '#icon-star',
  IconFullStar = '#icon-full-star'
}

function ProductCard(props: ProductCardPropsType):JSX.Element{
  const {good} = props;
  const isInCart = false;

  const stars = createStars(STARS_COUNT, StarIconUrl.IconStar);
  const ratingStars = createStars(good.rating, StarIconUrl.IconFullStar);
  if(ratingStars){
    stars.splice(0,good.rating,...ratingStars);
  }
  const dispatch = useAppDispatch();

  const handleProductCardButtonClick = ()=> {
    dispatch(openModalCall(good));
    document.body.style.overflow = 'hidden';
  };


  return(
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${good.previewImgWebp} , ${good.previewImgWebp2x} 2x`} />
          <img src={good.previewImg} srcSet={`${good.previewImg2x} 2x`} width={280} height={240} alt={good.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {stars.map((item)=>(
            <svg key={item.id} width={17} height={16} aria-hidden="true">
              <use xlinkHref={item.url} />
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {good.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{good.reviewCount}</p>
        </div>
        <p className="product-card__title">{good.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{good.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInCart ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to="#">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>В корзине
          </Link>
          :
          <button
            onClick={handleProductCardButtonClick}
            className="btn btn--purple product-card__btn" type="button"
          >Купить
          </button>}
        <Link className="btn btn--transparent" to="#">Подробнее
        </Link>
      </div>
    </div>
  );
}
export default ProductCard;
