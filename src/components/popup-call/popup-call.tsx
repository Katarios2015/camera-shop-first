import { ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index-hook';
import useFocus from '../../hooks/use-focus';
import { getIsModalCallActive, getActiveGood } from '../../store/modal-call/selectors';
import { closeModalCall } from '../../store/modal-call/modal-call';
import useTrapFocus from '../../hooks/use-trap-focus';

import { postOrder } from '../../store/api-actions';
import { getServerFomatPhone } from './common';
import { getDisabledFlag } from '../../store/modal-call/selectors';

function PopupCall():JSX.Element {
  const isModalCallActive = useAppSelector(getIsModalCallActive);
  const isFormDisabled = useAppSelector(getDisabledFlag);
  const activeGood = useAppSelector(getActiveGood);
  const dispatch = useAppDispatch();

  const firstFocusElementRef = useFocus<HTMLInputElement>(isModalCallActive);
  const lastFocusElementRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [phone, setPhone] = useState('');

  const handlePhoneInputChange = (event:ChangeEvent<HTMLInputElement>)=> {
    setPhone(event.target.value);
  };

  const handleCloseButtonOrOverLayClick = ()=>{
    document.body.style.overflow = 'visible';
    dispatch(closeModalCall());
    formRef.current?.reset();
    setPhone('');
  };


  const handleOrderButtonClick = (evt: FormEvent<HTMLFormElement>)=>{
    evt.preventDefault();
    if(activeGood){
      dispatch(postOrder({
        camerasIds: [activeGood.id],
        coupon: null,
        tel: getServerFomatPhone(phone)
      })).unwrap().then(()=>{
        handleCloseButtonOrOverLayClick();
      });
    }
  };

  useTrapFocus(firstFocusElementRef, lastFocusElementRef, isModalCallActive);

  useEffect(()=>{
    if(isModalCallActive){
      const onEscKeyDown = (event:KeyboardEvent) => {
        if(event.key === 'Escape') {
          event.preventDefault();
          document.body.style.overflow = 'visible';
          dispatch(closeModalCall());
        }
      };
      document.addEventListener('keydown', onEscKeyDown);
      return ()=> {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }
  },[isModalCallActive, dispatch]);


  return(
    <div className={isModalCallActive ? 'modal is-active' : 'modal'} data-testid='popupCall'>
      <div className="modal__wrapper">
        <div onClick={handleCloseButtonOrOverLayClick} className="modal__overlay"></div>
        <form ref={formRef} className="modal__content" action="#" method="post" onSubmit={handleOrderButtonClick}>
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${activeGood ? activeGood.previewImgWebp : ''} , ${activeGood ? activeGood.previewImgWebp2x : ''} 2x`} /><img src="img/content/orlenok.jpg" srcSet="img/content/orlenok@2x.jpg 2x" width={140} height={120} alt={activeGood?.name} data-testid='image'/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title" data-testid='goodName'>{activeGood?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>
                  <span className="basket-item__number" data-testid='vendorCode'>{activeGood?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item" data-testid='typeCategory'>{activeGood?.type} {activeGood?.category}</li>
                <li className="basket-item__list-item" data-testid='level'>{activeGood?.level} уровень</li>
              </ul>
              <p className="basket-item__price" data-testid='productCardPrice'>
                <span className="visually-hidden">Цена:</span>
                {activeGood?.price} ₽
              </p>
            </div>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">Телефон
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input ref={firstFocusElementRef}
                onInput = {handlePhoneInputChange}
                type="tel"
                pattern="^(\+7|8)[\(]{0,1}\d{3}[\)]{0,1}\d{3}[\-]{0,1}\d{2}[\-]{0,1}\d{2}"
                defaultValue={''}
                name="user-tel" placeholder="Введите ваш номер" required
                data-testid='phoneInput'
              />
            </label>
            <p className="custom-input__error">Нужно указать номер</p>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width" type="submit"
              disabled={isFormDisabled}
              data-testid='submitButton'
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>Заказать
            </button>
          </div>
          <button ref={lastFocusElementRef} onClick={handleCloseButtonOrOverLayClick}
            className="cross-btn" type="button" aria-label="Закрыть попап" data-testid ='closeButton'
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupCall;
