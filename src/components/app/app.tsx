import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';


import Main from '../../pages/main';
import Layout from '../layout/layout';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Main/>}/>
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
