import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';

import NotFound from './not-found';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
describe('Component: NotFound', () => {
  it('should render correctly', () => {
    vi.mock('../../components/breadcrumbs/breadcrumbs');
    render(withHistory(<NotFound/>));

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe('На главную');
    expect(BreadCrumbs).toBeCalledTimes(1);

  });
});
