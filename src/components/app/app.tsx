import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';


import Main from '../../pages/main';
import ProductPage from '../../pages/product-page/product-page';
import Layout from '../layout/layout';
import NotFound from '../../pages/not-found/not-found';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { AppRoute } from './const';

function App(): JSX.Element {
  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path={`${AppRoute.Product}/:id`} element={<ProductPage/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
