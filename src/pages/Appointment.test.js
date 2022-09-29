import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';
import { signInUser } from '../store/authSlice';

describe('the create appointment page', () => {
  beforeAll(() => {
    store.dispatch(signInUser());
  });

  it('should display the page title', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/new-appointment']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByTestId('title')).toBeInTheDocument();
  });

  it('should display the doctor, city and date input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/new-appointment']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByTestId('doctor')).toBeInTheDocument();
    expect(await screen.findByTestId('city')).toBeInTheDocument();
    expect(await screen.findByTestId('date')).toBeInTheDocument();
  });

  it('should display a submit button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/new-appointment']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByTestId('submit')).toBeInTheDocument();
  });
});
