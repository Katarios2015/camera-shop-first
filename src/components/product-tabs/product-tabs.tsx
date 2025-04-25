import {useSearchParams} from 'react-router-dom';
import {useState, MouseEvent, useEffect} from 'react';

import { GoodType } from '../../types/good-type';
import { getCirilicParamValue, CirilicPageTabs } from '../../components/filter-form/common';

const TAB_SEARCH_KEY = 'tab';

type ProductTabsProps = {
  product:GoodType;
}

function ProductTabs(prop:ProductTabsProps):JSX.Element{
  const {product} = prop;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTabDescriptionActive,setTabDescriptionActive] = useState(false);
  const [isTabPropertyActive,setTabPropertyActive] = useState(true);

  const handleTabControlButtonClick = (event: MouseEvent<HTMLButtonElement>)=>{
    const buttonName = event.currentTarget.name;
    const cirilicButtonName = getCirilicParamValue(buttonName);

    if (!searchParams.getAll(TAB_SEARCH_KEY).includes(cirilicButtonName)) {
      searchParams.set(TAB_SEARCH_KEY, cirilicButtonName);
      setSearchParams(searchParams);
    }
    setTabDescriptionActive(buttonName === 'description');
    setTabPropertyActive(buttonName === 'property');
  };

  useEffect(() => {
    if(Array.from(searchParams.values()).includes(CirilicPageTabs.Description)){
      setTabDescriptionActive(true);
      setTabPropertyActive(false);
    }
  }, [searchParams, isTabDescriptionActive]);
  return(
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={handleTabControlButtonClick}
          className={isTabPropertyActive ? 'tabs__control is-active' : 'tabs__control'} type="button"
          data-testid='propertyButton'
          name='property'
        >Характеристики
        </button>
        <button
          name='description'
          onClick={handleTabControlButtonClick}
          className={isTabDescriptionActive ? 'tabs__control is-active' : 'tabs__control'} type="button" data-testid='descriptionButton'
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className={isTabPropertyActive ? 'tabs__element is-active' : 'tabs__element'}
          data-testid = 'tabElementProperty'
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
          data-testid = 'tabElementDescription'
          className={isTabDescriptionActive ? 'tabs__element is-active' : 'tabs__element'}
        >
          <div data-testid='description' className="product__tabs-text">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;

