import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FilmDetails from './film-details';
import { createFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockFilm = createFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      DATA: {currentFilm: mockFilm}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <FilmDetails film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.starring.join(' ')}`)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(`${Math.trunc(mockFilm.runTime / 60)}h ${99 % 60}m`)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
