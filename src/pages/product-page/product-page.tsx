import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index-hook';
import { getProduct } from '../../store/goods-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { fetchDataProductPage, fetchDataReviews } from '../../store/api-actions';

import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewBlock from '../../components/review-block/review-block';
import RatingStars from '../../components/rating-stars/rating-stars';


function ProductPage():JSX.Element|undefined{
  const dispatch = useAppDispatch();
  const params = useParams();
  const activeProductId = Number(params.id);
  const product = useAppSelector(getProduct);
  const reviews = useAppSelector(getReviews);

  const [isTabDescriptionActive,setTabDescriptionActive] = useState(true);
  const [isTabPropertyActive,setTabPropertyActive] = useState(false);

  const handleAnchorLinkClick = ()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTabControlButtonClick = ()=>{
    if(isTabDescriptionActive){
      setTabDescriptionActive(false);
      setTabPropertyActive(true);
    } else {
      setTabDescriptionActive(true);
      setTabPropertyActive(false);
    }
  };

  useEffect(() => {

    if (activeProductId) {
      dispatch(fetchDataProductPage(activeProductId));
      dispatch(fetchDataReviews(activeProductId));
    }

  }, [activeProductId, dispatch]);

  if(product){
    return(
      <div className="wrapper">
        <main>
          <div className="page-content">
            <BreadCrumbs/>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`} /><img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width={560} height={480} alt={product.name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{product.name}</h1>
                    <RatingStars item={product} isReview={false}/>
                    <p className="product__price"
                      data-testid = 'productPrice'
                    >
                      <span className="visually-hidden">
                        Цена:
                      </span>
                      {product.price} ₽
                    </p>
                    <button className="btn btn--purple" type="button">
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button
                          onClick={handleTabControlButtonClick}
                          className={isTabPropertyActive ? 'tabs__control is-active' : 'tabs__control'} type="button"
                          data-testid='propertyButton'
                        >Характеристики
                        </button>
                        <button
                          onClick={handleTabControlButtonClick}
                          className={isTabDescriptionActive ? 'tabs__control is-active' : 'tabs__control'} type="button" data-testid='descriptionButton'
                        >Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <div
                          className={isTabPropertyActive ? 'tabs__element is-active' : 'tabs__element'}
                          data-testid = 'tabElement'
                        >
                          <ul className="product__tabs-list">
                            <li className="item-list"><span className="item-list__title">Артикул:</span>
                              <p className="item-list__text"> {product.vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{product.category}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{product.type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{product.level}</p>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={isTabDescriptionActive ? 'tabs__element is-active' : 'tabs__element'}
                        >
                          <div data-testid='description' className="product__tabs-text">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <ReviewBlock reviews={reviews}/>
          </div>
        </main>
        <Link onClick={handleAnchorLinkClick} className="up-btn" to='#header' data-testid='upButton'>
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </Link>
      </div>
    );
  }


}

export default ProductPage;
