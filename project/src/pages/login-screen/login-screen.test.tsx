import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import LoginScreen from './login-screen';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Conponent: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getAllByText(/Sign In/i)[0];
    const buttonElement = screen.getAllByText(/Sign In/i)[1];

    expect(titleElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/Email address/i), 'login');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), '1234567890');

    expect(screen.getByDisplayValue(/login/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });
});
