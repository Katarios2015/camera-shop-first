import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index-hook';

import { getIsModalCallActive, getActiveGood } from '../../store/modal-call/selectors';
import { closeModalCall } from '../../store/modal-call/modal-call';
import useTrapFocus from '../../hooks/use-trap-focus/use-trap-focus';
import useFocus from '../../hooks/use-focus/use-focus';
import { postOrder } from '../../store/api-actions';
import { getServerFomatPhone } from './common';

function PopupCall():JSX.Element|undefined {
  const isModalCallActive = useAppSelector(getIsModalCallActive);
  const activeGood = useAppSelector(getActiveGood);
  const dispatch = useAppDispatch();

  const firstFocusElementRef = useFocus<HTMLInputElement>(isModalCallActive);
  const lastFocusElementRef = useRef<HTMLButtonElement>(null);

  const [phone, setPhone] = useState('');
  const [validationClass, setValidationClass] = useState('');
  const [disabled, setDisabled] = useState(false);


  const handlePhoneInputChange = (event:ChangeEvent<HTMLInputElement>)=> {
    const phoneValue = event.target.value;
    const regPattern = /^(\+7|8)(\(|\s){0,1}9{1}\d{2}(\)|\s){0,1}\d{3}(-|\s){0,1}\d{2}(-|\s){0,1}\d{2}$/g;

    if(regPattern.test(phoneValue)){
      setPhone(phoneValue);
      setValidationClass('is-valid');
      setDisabled(false);
    } else {
      setValidationClass('is-invalid');
      setDisabled(true);
    }
  };

  const handleCloseButtonOrOverLayClick = ()=>{
    document.body.style.overflow = 'visible';
    dispatch(closeModalCall());
    if(firstFocusElementRef.current){
      firstFocusElementRef.current.value = '';
    }
    setPhone('');
    setValidationClass('');
    setDisabled(false);
  };


  const handleOrderButtonClick = ()=>{
    if(activeGood && validationClass === 'is-valid'){
      setDisabled(true);
      dispatch(postOrder({
        camerasIds: [activeGood.id],
        coupon: null,
        tel: getServerFomatPhone(phone)
      })).unwrap().then(()=>{
        handleCloseButtonOrOverLayClick();
      });
    }else if(phone === ''){
      setValidationClass('is-invalid');
    }
  };

  useTrapFocus(firstFocusElementRef, lastFocusElementRef, isModalCallActive);

  const handleDocumentEscKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if(isModalCallActive && event.key === 'Escape') {
      event.preventDefault();
      document.body.style.overflow = 'visible';
      dispatch(closeModalCall());
      handleCloseButtonOrOverLayClick();
    }
  };
  const regex = /\p{Script=Cyrillic}+ /u;
  const splitIntoWords = (text:string)=> text.split(/\s+/);
  const splittedNames = activeGood ? splitIntoWords(activeGood.name) : '';

  if(activeGood){
    return(
      <div className={isModalCallActive ? 'modal is-active' : 'modal'} data-testid='popupCall' onKeyDown={handleDocumentEscKeyDown}>
        <div className="modal__wrapper">
          <div onClick={handleCloseButtonOrOverLayClick} className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${activeGood ? activeGood.previewImgWebp : ''} , ${activeGood ? activeGood.previewImgWebp2x : ''} 2x`} /><img src="img/content/orlenok.jpg" srcSet="img/content/orlenok@2x.jpg 2x" width={140} height={120} alt={activeGood?.name} data-testid='image'/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title" data-testid='goodName'>{
                  regex.test(activeGood.name) ? `${splittedNames[0]} «${splittedNames.slice(1).toString().replace(/,/g,' ')}»` : `${activeGood.category} ${activeGood.name}`
                }
                </p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>
                    <span className="basket-item__number" data-testid='vendorCode'>{activeGood.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item" data-testid='typeCategory'>{activeGood.type} {activeGood.category}</li>
                  <li className="basket-item__list-item" data-testid='level'>{activeGood.level} уровень</li>
                </ul>
                <p className="basket-item__price" data-testid='productCardPrice'>
                  <span className="visually-hidden">Цена:</span>
                  {activeGood.price} ₽
                </p>
              </div>
            </div>
            <div className={`custom-input form-review__item ${validationClass}`}>
              <label>
                <span className="custom-input__label">Телефон
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input ref={firstFocusElementRef}
                  onChange = {handlePhoneInputChange}
                  type="tel"
                  title="допустипый формат: +7(9XX)XXX-XX-XX"
                  defaultValue={phone}
                  name="user-tel" placeholder="Введите ваш номер" required
                  data-testid='phoneInput'
                />
              </label>
              <p className="custom-input__error">Нужно указать номер</p>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
                disabled={disabled}
                onClick={handleOrderButtonClick}
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
          </div>
        </div>
      </div>
    );
  }

}

export default PopupCall;
