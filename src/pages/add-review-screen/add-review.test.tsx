import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import AddReviewScreen from './add-review-screen';
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
    films: [],
    currentFilm: mockFilm,
    similarFilms: mockFilms,
    filmsByGenre: [],
    reviews: [],
    favoriteFilms: [],
    isFilmsDataLoaded: true,
    isCurrentFilmDataLoaded: true,
    isFavoriteFilmsDataLoaded: true,
  }
});
const history = createMemoryHistory();

describe('Component: PlayerScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
