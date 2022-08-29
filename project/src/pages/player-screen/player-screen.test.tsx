import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import PlayerScreen from './player-screen';
import { createFakeFilm } from '../../utils/mocks';

const mockFilm = createFakeFilm();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  DATA: {
    genre: 'All genres',
    filmsPerStep: 8,
    films: [],
    currentFilm: mockFilm,
    similarFilms: [],
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
          <PlayerScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
