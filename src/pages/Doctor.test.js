import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';

describe('the Doctor details page', () => {
  it('should show the doctor\'s details acording to the id i.e. 1', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/doctors/1']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Dr. John Doe')).toBeInTheDocument();
    expect(await screen.findByText('5 years', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Ophtalmology', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('$50', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Reserve Appointment', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('John description text', { exact: false })).toBeInTheDocument();
  });

  it('should show the doctor\'s details acording to the id i.e. 2', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/doctors/2']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Dr. Jane Doe')).toBeInTheDocument();
    expect(await screen.findByText('10 years', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Cardiology', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('$100', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Reserve Appointment', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Jane description text', { exact: false })).toBeInTheDocument();
  });
});
