import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';

import SocialList from './social-list';
import { SOCIAL_ITEMS } from '../layout/const';
describe('Component: SocialList', () => {
  it('should render correct', () => {
    const socialListId = 'social';
    const socialItemId = 'socialItem';

    render(withHistory(<SocialList socialItems={SOCIAL_ITEMS}/>));
    const socialListContainer = screen.getByTestId(socialListId);
    const socialItems = screen.getAllByTestId(socialItemId);

    expect(socialListContainer).toBeInTheDocument();
    expect(socialItems.length).toBe(SOCIAL_ITEMS.length);
  });
});
