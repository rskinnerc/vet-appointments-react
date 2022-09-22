/* eslint-disable no-param-reassign */
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import MainPage from './MainPage';
import NavMenu from '../components/NavMenu';

describe('the main page', () => {
  afterEach(() => cleanup());

  it('should show the list of doctors', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    const xpr = await screen.queryByText('Experience:', { exact: false });
    const spc = await screen.queryByText('Specialization:', { exact: false });
    const prc = await screen.queryByText('Consultation Price:', { exact: false });
    expect(xpr).toHaveLength(5);
    expect(spc).toHaveLength(5);
    expect(prc).toHaveLength(5);
  });

  it('should show the navigation menu', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavMenu />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Vets App', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('VETS')).toBeInTheDocument();
    expect(await screen.findByText('MAKE AN APPOINTMENT')).toBeInTheDocument();
    expect(await screen.findByText('MY APPOINTMENTS')).toBeInTheDocument();
    expect(await screen.findByText('ADD VET')).toBeInTheDocument();
    expect(await screen.findByText('DELETE VET')).toBeInTheDocument();
  });

  it('should show the page title', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('LATEST VETS')).toBeInTheDocument();
  });
});
