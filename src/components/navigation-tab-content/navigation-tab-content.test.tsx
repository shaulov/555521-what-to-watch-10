import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import NavigationTabContent from './navigation-tab-content';

const mockStore = configureMockStore();
const mockTitleTabs = ['Drama', 'Horror', 'Kids', 'Drams'];
const mockOnClickHandler = jest.fn((value) => `${value }`);

describe('Component: NavigationTabContent', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = {
      DATA: {genre: 'Drama'}
    };

    render(
      <Provider store={mockStore(store)}>
        <HistoryRouter history={history}>
          <NavigationTabContent activeTab={'active'} onClickHandler={mockOnClickHandler} titleTabs={mockTitleTabs} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockTitleTabs[0])).toBeInTheDocument();
    expect(screen.getByText(mockTitleTabs[1])).toBeInTheDocument();
    expect(screen.getByText(mockTitleTabs[2])).toBeInTheDocument();
    expect(screen.getByText(mockTitleTabs[3])).toBeInTheDocument();
  });
});
