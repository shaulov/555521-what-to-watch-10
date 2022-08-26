import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import GenresList from './genres-list';

const mockStore = configureMockStore();
const mockGenres = ['Drama', 'Horror', 'Kids', 'Drams'];
const mockOnFilterChange = jest.fn((genre) => `${genre }`);

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      DATA: {genre: 'Drama'}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <GenresList genres={mockGenres} onFilterChange={mockOnFilterChange} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockGenres[0])).toBeInTheDocument();
    expect(screen.getByText(mockGenres[1])).toBeInTheDocument();
    expect(screen.getByText(mockGenres[2])).toBeInTheDocument();
    expect(screen.getByText(mockGenres[3])).toBeInTheDocument();
  });
});
