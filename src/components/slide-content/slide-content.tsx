import { AppRoute } from '../app/const';
import { Link } from 'react-router-dom';

import { PromoSlideType } from '../../types/promo-slide-type';

type SlideContentType ={
  item:PromoSlideType;
}

function SlideContent(props:SlideContentType): JSX.Element {
  const {item} = props;
  return (
    <>
      <picture key={item.id}>
        <source type="image/webp" srcSet={`${item.previewImgWebp}, ${item.previewImgWebp2x} 2x`} />
        <img src={item.previewImg} srcSet={`${item.previewImg2x} 2x`} width={1280} height={280} alt="баннер" data-testid='slideImage'/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1" data-testid='productName'>{item.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}/${item.id}`}>Подробнее</Link>
      </p>
    </>
  );
}

export default SlideContent;
