import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks/index-hook';
import { getProduct } from '../../store/goods-data/selectors';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewBlock from '../../components/review-block/review-block';
import { fetchDataProductPage } from '../../store/api-actions';
import { createStars, STARS_COUNT, StarIconUrl} from '../../components/product-rate/common';
import ProductRate from '../../components/product-rate/product-rate';


function ProductPage():JSX.Element|undefined{
  const dispatch = useAppDispatch();
  const params = useParams();
  const activeProductId = Number(params.id);
  const product = useAppSelector(getProduct);

  const stars = createStars(STARS_COUNT, StarIconUrl.IconStar);
  const ratingStars = product ? createStars(product.rating, StarIconUrl.IconFullStar) : null;
  if(ratingStars && product){
    stars.splice(0,product.rating,...ratingStars);
  }

  const [isTabDescriptionActive,setTabDescriptionActive] = useState(true);
  const [isTabPropertyActive,setTabPropertyActive] = useState(false);


  const handleTabControlButtonClick = ()=>{
    if(isTabDescriptionActive){
      setTabDescriptionActive(false);
      setTabPropertyActive(true);
    } else {
      setTabDescriptionActive(true);
      setTabPropertyActive(false);
    }
  };

  useEffect(()=>{
    dispatch(fetchDataProductPage(activeProductId));
  },[activeProductId, dispatch]);

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
                    <ProductRate good={product}/>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{product.price} ₽</p>
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
                        >Характеристики
                        </button>
                        <button
                          onClick={handleTabControlButtonClick}
                          className={isTabDescriptionActive ? 'tabs__control is-active' : 'tabs__control'} type="button"
                        >Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <div
                          className={isTabPropertyActive ? 'tabs__element is-active' : 'tabs__element'}
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
                          <div className="product__tabs-text">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <ReviewBlock/>
          </div>
        </main>
        <Link className="up-btn" to='#header'>
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </Link>
      </div>
    );
  }


}

export default ProductPage;
