import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import ReviewForm from './review-form';
import { createFakeFilm, createFakeFilms } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const mockFilm = createFakeFilm();
const mockFilms = createFakeFilms(4);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    genre: 'All genres',
    filmsPerStep: 8,
    films: mockFilms,
    currentFilm: mockFilm,
    similarFilms: mockFilms,
    filmsByGenre: mockFilms,
    reviews: [],
    favoriteFilms: mockFilms,
    isFilmsDataLoaded: true,
    isCurrentFilmDataLoaded: true,
    isFavoriteFilmsDataLoaded: true,
  }
});
const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
