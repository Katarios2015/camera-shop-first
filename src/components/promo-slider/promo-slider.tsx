import { useRef } from 'react';
import { useAppSelector } from '../../hooks/index-hook';
import { getPromoSlides } from '../../store/slider-data/selectors';
import SlideContent from '../slide-content/slide-content';
import {Pagination, Autoplay} from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './promo-slider-style.css';

function PromoSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const promoSlides = useAppSelector(getPromoSlides);
  const SLIDE_MOVE_SPEED = 1000;
  const INTERVAL_MILLISECONDS = 3000;
  const VISIBLE_SLIDES_COUNT = 1;

  if(promoSlides.length > 0){
    return (
      <div className='banner'>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          slidesPerView={VISIBLE_SLIDES_COUNT}
          initialSlide={0}
          loop
          speed={SLIDE_MOVE_SPEED}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: INTERVAL_MILLISECONDS }}
          style={{ height: '280px' }}
        >
          { promoSlides.map((item)=>(
            <SwiperSlide key={item.id}>
              <SlideContent item={item}/>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" slot="pagination">
          </div>
        </Swiper>
      </div>
    );
  }
}

export default PromoSlider;
