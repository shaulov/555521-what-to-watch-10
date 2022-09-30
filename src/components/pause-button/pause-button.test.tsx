import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import PauseButton from './pause-button';

describe('Component: PauseButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PauseButton />
      </HistoryRouter>,
    );

    expect(screen.getByText('Pause')).toBeInTheDocument();
  });
});
