import {Link } from 'react-router-dom';
import { SocialItemType } from '../../types/footer-list-type';

type SocialItemsProp={
  socialItems:SocialItemType[];
}

function SocialList(props: SocialItemsProp):JSX.Element{
  const {socialItems} = props;
  return(
    <ul className="social" data-testid='social'>
      {socialItems.map((item)=>(
        <li key={item.ariaLabel} className="social__item" data-testid='socialItem'>
          <Link className="link" to={'#'} aria-label={item.ariaLabel}>
            <svg width={20} height={20} aria-hidden="true">
              <use xlinkHref={item.url} />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SocialList;
