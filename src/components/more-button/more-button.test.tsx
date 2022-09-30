import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import MoreButton from './more-button';

const mockButtonClick = jest.fn();

describe('Component: MoreButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <MoreButton onShowMoreButtonClick={mockButtonClick}/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
