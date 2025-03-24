import {render, screen} from '@testing-library/react';

import {withHistory} from '../../utils/mock-component';
import FooterList from './footer-list';
import { NAVIGATE_ITEMS } from '../navigate-list/const';
import { SOURCE_ITEMS } from '../layout/const';
import { SUPPORT_ITEMS } from '../layout/const';

describe('Component: FooterList', () => {
  it('should render correct with NAVIGATE_ITEMS', () => {
    const footerListId = 'footerList';
    const footerListItemId = 'footerListItem';

    render(withHistory(<FooterList footerItems={NAVIGATE_ITEMS}/>));
    const footerListContainer = screen.getByTestId(footerListId);
    const footerItems = screen.getAllByTestId(footerListItemId);

    expect(footerListContainer).toBeInTheDocument();
    expect(footerItems.length).toBe(NAVIGATE_ITEMS.length);
  });
  it('should render correct with SOURCE_ITEMS', () => {
    const footerListId = 'footerList';
    const footerListItemId = 'footerListItem';


    render(withHistory(<FooterList footerItems={SOURCE_ITEMS}/>));
    const footerListContainer = screen.getByTestId(footerListId);
    const footerItems = screen.getAllByTestId(footerListItemId);


    expect(footerListContainer).toBeInTheDocument();
    expect(footerItems.length).toBe(SOURCE_ITEMS.length);
  });
  it('should render correct with SUPPORT_ITEMS', () => {
    const footerListId = 'footerList';
    const footerListItemId = 'footerListItem';


    render(withHistory(<FooterList footerItems={SUPPORT_ITEMS}/>));
    const footerListContainer = screen.getByTestId(footerListId);
    const footerItems = screen.getAllByTestId(footerListItemId);


    expect(footerListContainer).toBeInTheDocument();
    expect(footerItems.length).toBe(SUPPORT_ITEMS.length);
  });
});
