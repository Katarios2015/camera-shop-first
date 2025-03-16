import {Link } from 'react-router-dom';
import { FooterItemType } from '../../types/footer-list-type';

type FooterItemsProp={
  footerItems:FooterItemType[];
}

function FooterList(props:FooterItemsProp):JSX.Element{
  const {footerItems} = props;
  return(
    <ul className="footer__list" data-testid='footerList'>
      {footerItems.map((item)=>(
        <li key={item.name} className="footer__item" data-testid='footerListItem'>
          <Link className="link" to={item.url}>{item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default FooterList;
