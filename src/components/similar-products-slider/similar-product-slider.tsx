import { useRef} from 'react';
import { GoodType } from '../../types/good-type';
import ProductCard from '../product-card/product-card';

import {Navigation} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type SimilarGoodsProps = {
  similarGoods:GoodType[];
}

function SimilarProductSlider(props:SimilarGoodsProps):JSX.Element {
  const {similarGoods} = props;
  const swiperRef = useRef<SwiperType | null>(null);
  const SLIDE_MOVE_SPEED = 1000;
  const VISIBLE_SLIDES_COUNT = 3;

  const handleNextButtonClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const handlePrevButtonClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              <Swiper
                modules={[Navigation]}
                slidesPerGroup={VISIBLE_SLIDES_COUNT}
                slidesPerView={VISIBLE_SLIDES_COUNT}
                style={{height:'100%'}}
                speed={SLIDE_MOVE_SPEED}
                resizeObserver= {false}
                navigation={{
                  nextEl: '.slider-controls--next',
                  prevEl: '.slider-controls--prev',
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {similarGoods.map((item)=>(
                  <SwiperSlide key={item.id} data-test-id='swiper-slide'>
                    <ProductCard good={item} isSlider isActiveClass={'is-active'} styleSimilar={{width: 'calc(94.876% - 16px)', height: '100%'}}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onMouseDown={handlePrevButtonClick}>
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onMouseDown={handleNextButtonClick}>
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarProductSlider;
