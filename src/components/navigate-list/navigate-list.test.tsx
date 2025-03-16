import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';

import NavigateList from './navigate-list';
import { NAVIGATE_ITEMS } from './const';
describe('Component: NavigateList', () => {
  it('should render correct with NAVIGATE_ITEMS', () => {
    const navigateListId = 'navigateList';
    const navigateItemId = 'navigateItem';


    render(withHistory(<NavigateList/>));
    const navigateListContainer = screen.getByTestId(navigateListId);
    const navigateItems = screen.getAllByTestId(navigateItemId);


    expect(navigateListContainer).toBeInTheDocument();
    expect(navigateItems.length).toBe(NAVIGATE_ITEMS.length);
  });
});
