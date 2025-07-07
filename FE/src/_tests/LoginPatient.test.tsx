import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPatient from '../pages/Patient/LoginPatient';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

// ✅ Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// ✅ Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// ✅ Create a mock dispatch function
const mockDispatch = jest.fn();

// ✅ Mock useDispatch to return mockDispatch
jest.mock('react-redux', () => {
  const actualRedux = jest.requireActual('react-redux');
  return {
    ...actualRedux,
    useDispatch: () => mockDispatch,
  };
});

describe('LoginPatient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPatient />
        </MemoryRouter>
      </Provider>
    );

  it('renders form inputs and buttons', () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    renderWithProviders();

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });


  it('calls submitLoginForm with correct data on valid submit', async () => {
    const spy = jest.spyOn(require('../redux/actions/loginActions'), 'submitLoginForm');

    renderWithProviders();

    fireEvent.input(screen.getByPlaceholderText(/email/i), {
      target: { value: 'willsmith@gmail.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: { value: 'Password@123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        formData: {
          email: 'willsmith@gmail.com',
          password: 'Password@123',
          role: 'patient',
        },
        navigate: expect.any(Function),
        toast: expect.any(Object),
      });
    });
  });

});
