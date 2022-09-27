import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';
import { signInUser } from '../store/authSlice';

describe('the Appointments list page', () => {
  beforeAll(() => {
    store.dispatch(signInUser());
  });

  it('should display the page title', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/appointments']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByTitle('appointments')).toBeInTheDocument();
  });

  it('should show the list of appointments for the user', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/appointments']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Name: John Doe')).toBeInTheDocument();
    expect(await screen.findByText('City: Minsk')).toBeInTheDocument();
    expect(await screen.findByText('Date: 25-03-2022', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Time: 08:00', { exact: false })).toBeInTheDocument();
  });
});
