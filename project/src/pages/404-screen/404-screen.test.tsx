import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Screen404 from './404-screen';

describe('Component: Screen404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Screen404 />
      </HistoryRouter>,
    );

    const textElement = screen.getByText(/404 Not Found/i);

    expect(textElement).toBeInTheDocument();
  });
});
