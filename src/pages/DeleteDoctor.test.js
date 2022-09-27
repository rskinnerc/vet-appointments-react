import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import store from '../store/store';
import App from '../App';
import { signInUser } from '../store/authSlice';
import { getDoctors } from '../store/doctorSlice';

describe('the delete doctors page', () => {
  it('should not allow a non-authenticated user to delete a doctor', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/doctors/delete']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('You are not authorized to perform this actions. Please Sign in.')).toBeInTheDocument();
  });

  describe('signed in user', () => {
    beforeEach(() => {
      store.dispatch(signInUser('TestUser'));
      store.dispatch(getDoctors());
    });

    it('should show a list of doctors to delete', async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/doctors/delete']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      expect(await screen.findByText('Delete a Doctor')).toBeInTheDocument();
      expect(await screen.findByText('John Doe', { exact: false })).toBeInTheDocument();
      expect(await screen.findByText('Jane Doe', { exact: false })).toBeInTheDocument();
    });

    it('should show a list of doctors to delete', async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/doctors/delete']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      const doctor1 = await screen.findByTestId('doctor-1');
      const doctor2 = await screen.findByTestId('doctor-2');

      act(() => {
        userEvent.click(doctor1);
        userEvent.click(doctor2);
      });

      expect(await screen.findByText('Delete a Doctor')).toBeInTheDocument();
      expect(await screen.findByText('John Doe', { exact: false })).not.toBeInTheDocument();
      expect(await screen.findByText('Jane Doe', { exact: false })).not.toBeInTheDocument();
      expect(await screen.findByText('There are no doctors. Please add a new one.', { exact: false })).toBeInTheDocument();
    });
  });
});
