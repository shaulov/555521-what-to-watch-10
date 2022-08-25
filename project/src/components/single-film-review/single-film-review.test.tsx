import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SingleFilmReview from './single-film-review';
import { createFakeReview } from '../../utils/mocks';
import { MONTH } from '../../const';

const mockStore = configureMockStore();
const mockReview = createFakeReview();

describe('Component: SingleFilmReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    const store = {
      DATA: {reviews: [mockReview]}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <SingleFilmReview review={mockReview} />
        </HistoryRouter>
      </Provider>
    );

    const mockFormatedDate = new Date(mockReview.date);

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.rating)).toBeInTheDocument();
    expect(screen.getByText(`${MONTH[mockFormatedDate.getMonth()]} ${mockFormatedDate.getDate()}, ${mockFormatedDate.getFullYear()}`)).toBeInTheDocument();
  });
});
