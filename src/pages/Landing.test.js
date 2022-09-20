import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';

describe('the landing page', () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    store.dispatch({ type: 'auth/signOut' });
  });

  it('should show the landing page and links as home', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText('Vet Appointments App')).toBeInTheDocument();
    expect(screen.queryByText('Find a Vet')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Continue as Guest')).toBeInTheDocument();
  });

  it('should show the auth popup when clicking on sign in', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.queryByText('Sign In'));

    expect(await screen.findByText('Sign in with', { exact: false })).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Username', { exact: false })).toBeInTheDocument();
  });

  it('should allow the user to sign in with a username.', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getAllByText('Sign In')[1]);

    fireEvent.input(screen.queryByPlaceholderText('Username'), { target: { value: 'test' } });

    fireEvent.click(screen.queryByTestId('sign-in-button'));

    expect(await screen.findByText('Welcome test', { exact: false })).toBeInTheDocument();
  });

  it('should show a sign out button and allow the user to sign out', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.queryByText('Sign In'));

    fireEvent.input(screen.queryByPlaceholderText('Username'), { target: { value: 'test' } });

    fireEvent.click(screen.queryByTestId('sign-in-button'));

    expect(await screen.findByText('Welcome test', { exact: false })).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Sign Out'));

    expect(await screen.findByText('Continue as Guest', { exact: false })).toBeInTheDocument();
  });
});
