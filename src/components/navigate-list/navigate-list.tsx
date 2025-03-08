import {NavLink } from 'react-router-dom';
import { NAVIGATE_ITEMS } from './const';
function NavigateList():JSX.Element{
  return(
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        {NAVIGATE_ITEMS.map((item)=>(
          <li key={item.name} className="main-nav__item">
            <NavLink className="main-nav__link" to={item.url}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default NavigateList;
