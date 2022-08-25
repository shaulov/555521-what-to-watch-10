import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { fetchFilmAction, checkAuthAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import ResetFilmList from './utils/resetFilmList';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <ScrollToTop />
        <ResetFilmList />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
