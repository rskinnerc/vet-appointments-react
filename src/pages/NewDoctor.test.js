import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import store from '../store/store';
import App from '../App';
import { signInUser } from '../store/authSlice';

describe('the add new doctor page', () => {
  it('should not allow a non-authenticated user to create a new doctor', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/doctors/new']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('You are not authorized to perform this actions. Please Sign in.')).toBeInTheDocument();
  });

  describe('signed in user', () => {
    beforeEach(() => {
      store.dispatch(signInUser('TestUser'));
    });

    it('should show the form to add a new doctor', async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/doctors/new']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      expect(await screen.findByText('Add a Doctor')).toBeInTheDocument();
      expect(await screen.findByPlaceholderText('Name', { exact: false })).toBeInTheDocument();
      expect(await screen.findByPlaceholderText('Specialization', { exact: false })).toBeInTheDocument();
      expect(await screen.findByPlaceholderText('Years of experience', { exact: false })).toBeInTheDocument();
      expect(await screen.findByPlaceholderText('Price', { exact: false })).toBeInTheDocument();
      expect(await screen.findByPlaceholderText('Description', { exact: false })).toBeInTheDocument();
      expect(await screen.findByText('Add Doctor', { exact: false })).toBeInTheDocument();
    });

    it('should allow the user to add a new doctor', async () => {
      const user = userEvent.setup();
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/doctors/new']}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      act(() => {
        user.type(screen.queryByPlaceholderText('Name', { exact: false }), 'Test Doctor');

        user.type(screen.queryByPlaceholderText('Specialization', { exact: false }), 'Test Specialization');

        user.type(screen.queryByPlaceholderText('Years of experience', { exact: false }), '10');

        user.type(screen.queryByPlaceholderText('Price', { exact: false }), '100');

        user.type(screen.queryByPlaceholderText('Description', { exact: false }), 'Test Long Description');

        user.upload(screen.queryByLabelText('Doctor Photo', { exact: false }), new File(['(⌐□_□)'], 'testdoctor.png', { type: 'image/png' }));

        user.click(screen.queryByText('Add Doctor', { exact: false }));
      });

      expect(screen.findByText('Test Doctor')).not.toBeNull();
      expect(screen.findByText('Test Specialization')).not.toBeNull();
      expect(screen.findByText('10')).not.toBeNull();
      expect(screen.findByText('100')).not.toBeNull();
      expect(screen.findByText('Test Long Description')).not.toBeNull();
      expect(screen.findByAltText('Test Doctor')).not.toBeNull();
    });
  });
});
