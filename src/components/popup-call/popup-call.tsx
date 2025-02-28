import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index-hook';
import { getIsModalCallActive, getActiveGood } from '../../store/modal-call/selectors';
import { closeModalCall } from '../../store/modal-call/modal-call';

function PopupCall():JSX.Element {
  const isModalCallActive = useAppSelector(getIsModalCallActive);
  const activeGood = useAppSelector(getActiveGood);
  const dispatch = useAppDispatch();

  const handleCloseButtonOrOverLayClick = ()=>{
    dispatch(closeModalCall());
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, []);


  useEffect(()=>{
    if(isModalCallActive){
      const onEscKeyDown = (event:KeyboardEvent) => {
        event.preventDefault();
        if(event.key === 'Escape') {
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
    <div className={isModalCallActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div
          onClick={handleCloseButtonOrOverLayClick}
          className="modal__overlay"
        />
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${activeGood ? activeGood.previewImgWebp : ''} , ${activeGood ? activeGood.previewImgWebp2x : ''} 2x`} /><img src="img/content/orlenok.jpg" srcSet="img/content/orlenok@2x.jpg 2x" width={140} height={120} alt={activeGood?.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{activeGood?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{activeGood?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{activeGood?.type}  {activeGood?.category}</li>
                <li className="basket-item__list-item">{activeGood?.level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{activeGood?.price} ₽</p>
            </div>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">Телефон
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input tabIndex={0} ref={inputRef} type="tel" name="user-tel" placeholder="Введите ваш номер" required autoFocus={isModalCallActive}/>
            </label>
            <p className="custom-input__error">Нужно указать номер</p>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>Заказать
            </button>
          </div>
          <button tabIndex={1} onClick={handleCloseButtonOrOverLayClick}
            className="cross-btn" type="button" aria-label="Закрыть попап"
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

export default PopupCall;
