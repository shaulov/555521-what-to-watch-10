import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FilmOverview from './film-overview';
import { createFakeFilm } from '../../utils/mocks';
import { getFilmRatingLevel } from '../../utils/getFilmRatingLevel';

const mockStore = configureMockStore();
const mockFilm = createFakeFilm();

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      DATA: {currentFilm: mockFilm}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <FilmOverview film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(getFilmRatingLevel(mockFilm.rating))).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${mockFilm.starring.slice(0, 3).join(', ')} and other`)).toBeInTheDocument();
  });
});
