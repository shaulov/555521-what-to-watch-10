import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FilmCardButtons from './film-card-buttons';
import { AuthorizationStatus } from '../../const';
import { createFakeFilms } from '../../utils/mocks';


const mockStore = configureMockStore();
const mockFilms = createFakeFilms(3);

describe('Component: FilmCardButtons', () => {
  it('should render correctly "FilmCardButtons"', () => {
    const history = createMemoryHistory();
    const store = {
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {favoriteFilms: mockFilms}
    };
    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <FilmCardButtons id={1} isFavorite={false}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });

  it('should render correctly "FilmCardButtons" when authorizationStatus is "AUTH" and user navigate to "films/:id"', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {favoriteFilms: mockFilms}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <FilmCardButtons id={1} isFavorite={false} authorizationStatus={AuthorizationStatus.Auth}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render correctly "FilmCardButtons" when authorizationStatus is "NO_AUTH" and user navigate to "films/:id"', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {favoriteFilms: mockFilms}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <FilmCardButtons id={1} isFavorite={false} authorizationStatus={AuthorizationStatus.NoAuth}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
  });
});
