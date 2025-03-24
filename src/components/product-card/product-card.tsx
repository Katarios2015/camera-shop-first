import { Link } from 'react-router-dom';
import { GoodType } from '../../types/good-type';
import {useAppDispatch} from '../../hooks/index-hook';
import { openModalCall } from '../../store/modal-call/modal-call';
import { AppRoute } from '../app/const';
import RatingStars from '../rating-stars/rating-stars';

type ProductCardPropsType={
  good:GoodType;
  isActiveClass: string;
  isSlider:boolean;
  styleSimilar:object;
}

function ProductCard(props: ProductCardPropsType):JSX.Element{
  const {good, isActiveClass, isSlider, styleSimilar} = props;
  const isInCart = false;
  const dispatch = useAppDispatch();

  const regex = /\p{Script=Cyrillic}+ /u;
  const splitIntoWords = (text:string)=> text.split(/\s+/);
  const splittedNames = splitIntoWords(good.name);

  const handleProductCardButtonClick = ()=> {
    dispatch(openModalCall(good));
    document.body.style.overflow = 'hidden';
  };

  return(
    <div className={isSlider ? `product-card ${isActiveClass}` : 'product-card'} data-testid='productCard' style={isSlider ? styleSimilar : {}}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${good.previewImgWebp} , ${good.previewImgWebp2x} 2x`} />
          <img src={good.previewImg} srcSet={`${good.previewImg2x} 2x`} width={280} height={240} alt={good.name} data-testid='image'/>
        </picture>
      </div>
      <div className="product-card__info">
        <RatingStars item={good} isReview={false}/>
        <p className="product-card__title" data-testid='productTitle'>
          {regex.test(good.name) ? `${splittedNames[0]} «${splittedNames.slice(1).toString().replace(/,/g,' ')}»` : `${good.category} ${good.name}`}
        </p>
        <p className="product-card__price" data-testid='productCardPrice'>
          <span className="visually-hidden">Цена:</span>{good.price.toLocaleString('ru-RU')} ₽
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
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${good.id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}
export default ProductCard;
