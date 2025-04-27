import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/index-hook';
import { getProduct } from '../../store/goods-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { getSimilarGoods } from '../../store/slider-data/selectors';
import { fetchDataProductPage, fetchDataReviews, fetchDataSimilarGoods } from '../../store/api-actions';

import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewBlock from '../../components/review-block/review-block';
import RatingStars from '../../components/rating-stars/rating-stars';
import SimilarProductSlider from '../../components/similar-products-slider/similar-product-slider';
import PopupCall from '../../components/popup-call/popup-call';
import ProductTabs from '../../components/product-tabs/product-tabs';


function ProductPage():JSX.Element|undefined{
  const dispatch = useAppDispatch();
  const params = useParams();
  const activeProductId = Number(params.id);
  const product = useAppSelector(getProduct);
  const reviews = useAppSelector(getReviews);
  const similarGoods = useAppSelector(getSimilarGoods);

  const isButtonCartTrue = false;

  const handleAnchorLinkClick = ()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (activeProductId) {
      dispatch(fetchDataProductPage(activeProductId));
      dispatch(fetchDataReviews(activeProductId));
      dispatch(fetchDataSimilarGoods(activeProductId));
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
                    <RatingStars item={product} isReview={false}
                      reviewsCount={reviews.length}
                    />
                    <p className="product__price"
                      data-testid = 'productPrice'
                    >
                      <span className="visually-hidden">
                        Цена:
                      </span>
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <button className="btn btn--purple" type="button" style={{visibility:isButtonCartTrue ? 'visible' : 'hidden'}}>
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>Добавить в корзину
                    </button>
                    <ProductTabs product={product}/>
                  </div>
                </div>
              </section>
            </div>
            {similarGoods ? <SimilarProductSlider similarGoods={similarGoods}/> : ''}
            <ReviewBlock reviews={reviews}/>
          </div>
          <PopupCall/>
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
