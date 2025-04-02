import {render, screen} from '@testing-library/react';

import {makeFakeStore, makeFakeProductCard} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import PopupCall from './popup-call';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../utils/mocks';

import { closeModalCall } from '../../store/modal-call/modal-call';
import { postOrder } from '../../store/api-actions';
import { ApiRoute } from '../../store/const';

describe('Component: PopupCall', () => {
  it('should render correctly with data and isModalCallActive=true', () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();

    const popupCallId = 'popupCall';
    const goodNameId = 'goodName';
    const vendorCodeId = 'vendorCode';
    const typeCategoryId = 'typeCategory';
    const levelId = 'level';
    const productCardPriceId = 'productCardPrice';
    const imageId = 'image';

    const { withStoreComponent } = withStore(<PopupCall/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const popupContainer = screen.getByTestId(popupCallId);
    const image = screen.getByTestId(imageId);
    const goodName = screen.getByTestId(goodNameId);
    const vendorCode = screen.getByTestId(vendorCodeId);
    const typeCategory = screen.getByTestId(typeCategoryId);
    const level = screen.getByTestId(levelId);
    const productCardPrice = screen.getByTestId(productCardPriceId);


    expect(popupContainer).toHaveClass('modal is-active');

    expect(goodName.textContent).toBe(`${fakeProduct.category} ${fakeProduct.name}`);
    expect(vendorCode.textContent).toBe(fakeProduct.vendorCode);
    expect(typeCategory.textContent).toBe(`${fakeProduct.type} ${fakeProduct.category}`);
    expect(level.textContent).toBe(`${fakeProduct.level} уровень`);
    expect(productCardPrice.textContent).toBe(`Цена:${fakeProduct.price} ₽`);

    expect(screen.getByText(/Свяжитесь со мной/i)).toBeInTheDocument();
    expect(screen.getByText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByText(/Заказать/i)).toBeInTheDocument();

    expect(image).toBeInTheDocument();
  });
  it('should called mockHandle 1 time', async () => {
    const mockHandleClick = vi.fn();
    render(
      <button onClick={mockHandleClick}
        className="cross-btn" type="button" aria-label="Закрыть попап" data-testid ='closeButton'
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('should dispatch closeModalCall', async () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();

    const closeButtonId = 'closeButton';

    const { withStoreComponent, mockStore} = withStore(<PopupCall/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const closeButton = screen.getByTestId(closeButtonId);

    await userEvent.click(closeButton);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      closeModalCall.type
    ]);
  });

  it('should dispatch postOrder', async () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();

    const phoneInputId = 'phoneInput';
    const submitButtonId = 'submitButton';
    const testPhone = '+79500445685';

    const { withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<PopupCall/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(`${ApiRoute.Orders}`).reply(201);

    render(preparedComponent);
    expect(screen.getByTestId(submitButtonId)).not.toBeDisabled();

    await userEvent.type(
      screen.getByTestId(phoneInputId),
      testPhone,
    );
    await userEvent.click(screen.getByTestId(submitButtonId));


    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postOrder.pending.type,
      postOrder.fulfilled.type,
      closeModalCall.type
    ]);
  });
  it('should not dispatch postOrder with wrong phone', async () => {
    const fakeProducts = [makeFakeProductCard()];
    const fakeProduct = makeFakeProductCard();

    const phoneInputId = 'phoneInput';
    const submitButtonId = 'submitButton';
    const wrongTestPhone = '+7';

    const { withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<PopupCall/>, makeFakeStore(
      {DATA_GOODS: {
        goods:fakeProducts,
        product: fakeProduct,
      },
      MODAL_CALL: {
        isModalCallActive: true,
        activeGood: fakeProduct,
      },
      DATA_REVIEWS:{
        reviews:[]
      },
      }
    ));

    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(`${ApiRoute.Orders}`).reply(201);

    render(preparedComponent);
    expect(screen.getByTestId(submitButtonId)).not.toBeDisabled();

    await userEvent.type(
      screen.getByTestId(phoneInputId),
      wrongTestPhone,
    );
    await userEvent.click(screen.getByTestId(submitButtonId));


    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([ ]);
  });
});

