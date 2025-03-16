import {render, screen} from '@testing-library/react';

import {withHistory} from '../../utils/mock-component';

import Layout from './layout';
import SocialList from '../social-list/social-list';
import FooterList from '../footer-list/footer-list';
import NavigateList from '../navigate-list/navigate-list';

describe('Component: Layout', () => {
  it('should render correct', () => {
    vi.mock('../social-list/social-list');
    vi.mock('../footer-list/footer-list');
    vi.mock('../navigate-list/navigate-list');

    const footerId = 'footer';
    const headerId = 'header';
    const footerLogoId = 'footerLogo';
    const headerLogoId = 'headerLogo';


    render(withHistory(<Layout/>));
    const footerContainer = screen.getByTestId(footerId);
    const headerContainer = screen.getByTestId(headerId);

    const headerLink = screen.getByTestId(footerLogoId);
    const footerLink = screen.getByTestId(headerLogoId);

    expect(footerContainer).toBeInTheDocument();
    expect(headerContainer).toBeInTheDocument();
    expect(headerLink).toBeInTheDocument();
    expect(footerLink).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();

    expect(SocialList).toBeCalledTimes(1);
    expect(NavigateList).toBeCalledTimes(1);
    expect(FooterList).toBeCalledTimes(3);
  });

});
