import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import PlayButton from './play-button';

describe('Component: PlayButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PlayButton />
      </HistoryRouter>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
