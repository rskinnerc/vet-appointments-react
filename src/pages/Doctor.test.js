import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';

describe('the Doctor details page', () => {
  it('should show the doctor\'s details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/doctors/1']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Dr. John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Experience: 5 years', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Specialization: Ophtalmology', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Price: $50', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Set Appointment', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('John description text', { exact: false })).toBeInTheDocument();
  });
});
