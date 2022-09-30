import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import LoadingScreen from './loading-screen';

describe('Coponent: LoadingScreen', () => {
  it('should render correct', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>
    );

    const textElement = screen.getByText('Loading ...');

    expect(textElement).toBeInTheDocument();
  });
});
