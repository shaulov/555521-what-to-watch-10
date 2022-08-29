import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import thunk from 'redux-thunk';
import UserBlock from './user-block';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Coponent: UserBlock', () => {
  it('should render correct when aythorizationStatus is "NoAuth"', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correct when aythorizationStatus is "Auth"', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
