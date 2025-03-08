import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';


import MainCatalog from '../../pages/main-catalog/main-catalog';
import ProductPage from '../../pages/product-page/product-page';
import Layout from '../layout/layout';
import NotFound from '../../pages/not-found/not-found';

import { AppRoute } from './const';

function App(): JSX.Element {
  return(
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Layout/>}>
          <Route index element={<MainCatalog/>}/>
          <Route path={`${AppRoute.Product}/:id`} element={<ProductPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
