import useTrapFocus from '../../hooks/use-trap-focus/use-trap-focus';
import useFocus from '../../hooks/use-focus/use-focus';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index-hook';

import { getIsModalCallActive } from '../../store/modal-call/selectors';

function PopupAddCart():JSX.Element|undefined{
  const isModalCallActive = useAppSelector(getIsModalCallActive);
  const firstFocusElementRef = useFocus<HTMLButtonElement>(isModalCallActive);
  const lastFocusElementRef = useRef<HTMLButtonElement>(null);
  useTrapFocus(firstFocusElementRef, lastFocusElementRef, isModalCallActive);

  return(
    <div className={isModalCallActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x" /><img src="img/content/orlenok.jpg" srcSet="img/content/orlenok@2x.jpg 2x" width={140} height={120} alt="Фотоаппарат «Орлёнок»" />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button ref={firstFocusElementRef} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>Добавить в корзину
            </button>
          </div>
          <button ref={lastFocusElementRef} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupAddCart;
