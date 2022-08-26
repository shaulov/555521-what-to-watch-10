import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import UserBlockLogin from './user-block-login';

describe('Coponent: UserBlockLogin', () => {
  it('should render correct', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <UserBlockLogin />
      </HistoryRouter>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
