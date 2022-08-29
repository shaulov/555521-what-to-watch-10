import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import thunk from 'redux-thunk';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { createFakeFilm, createFakeFilms, createFakeReviews } from '../../utils/mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilm = createFakeFilm();
const mockFilms = createFakeFilms(8);
const mockReviews = createFakeReviews();
let store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    genre: 'All genres',
    filmsPerStep: 8,
    films: mockFilms,
    currentFilm: mockFilm,
    similarFilms: mockFilms,
    filmsByGenre: mockFilms,
    promo: mockFilm,
    reviews: mockReviews,
    favoriteFilms: mockFilms,
    isFilmsDataLoaded: true,
    isCurrentFilmDataLoaded: true,
    isFavoriteFilmsDataLoaded: true,
  },
});
const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Aplication Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {
        genre: 'All genres',
        filmsPerStep: 8,
        films: mockFilms,
        currentFilm: mockFilm,
        similarFilms: mockFilms,
        filmsByGenre: mockFilms,
        reviews: mockReviews,
        favoriteFilms: mockFilms,
        isFilmsDataLoaded: true,
        isCurrentFilmDataLoaded: true,
        isFavoriteFilmsDataLoaded: true,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Sign In/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    store.getActions();

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigate to "/films/:id"', () => {
    history.push(`${AppRoute.Film}/1`);
    store.getActions();

    render(fakeApp);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    history.push(`${AppRoute.Film}/1/review`);
    store.getActions();

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:filmId"', () => {
    history.push(`${AppRoute.Player}/1`);
    store.getActions();

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('should render "Screen404" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
