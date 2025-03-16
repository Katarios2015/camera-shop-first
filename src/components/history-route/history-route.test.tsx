import {render} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import {AppRoute} from '../app/const';
import App from '../app/app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';


describe('Component: HistoryRoute', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should return location "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);
    render(withStoreComponent);
    const historyLocation = mockHistory.location.pathname;
    expect(historyLocation).toBe('/');
  });
});
