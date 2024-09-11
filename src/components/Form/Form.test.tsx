import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  TextEncoder as UtilTextEncoder,
  TextDecoder as UtilTextDecoder,
} from 'util';

(globalThis as any).TextEncoder = UtilTextEncoder;
(globalThis as any).TextDecoder = UtilTextDecoder;
import Form from '@/components/Form';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';
import { http } from 'msw';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'page.email': 'Email',
      'page.password': 'Password',
      'page.emailType': 'Invalid email format',
      'page.emailRequired': 'Email is required',
      'page.passwordRequired': 'Password is required',
      'page.login': 'Login',
    };
    return translations[key] || key;
  },
}));

const server = setupServer(
  http.post('/api/login', async () => {
    return new Response(
      JSON.stringify({
        accessToken: { jwtToken: 'fakeAccessToken' },
        idToken: {
          jwtToken: 'fakeIdToken',
          payload: {
            'custom:organizationId': 'fakeOrgId',
            'custom:organizationRole': 'fakeOrgRole',
            'custom:role': 'fakeRole',
            family_name: 'Doe',
            name: 'John',
          },
        },
        refreshToken: { token: 'fakeRefreshToken' },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }),

  http.get('/api/impact-run-list', () => {
    return new Response(JSON.stringify([{ id: 'fakeImpactRunId' }]), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get('/api/impact-run-detail/:id', (req) => {
    const { id } = req.params;

    return new Response(
      JSON.stringify({
        id,
        recommendations: ['recommendation1', 'recommendation2'],
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Form', () => {
  it('renders the form with the required fields', () => {
    renderWithProviders(<Form />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('shows validation errors when the form is submitted empty', async () => {
    renderWithProviders(<Form />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('calls the login API and updates the user state on successful submission', async () => {
    renderWithProviders(<Form />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('accessToken')).toBe('fakeAccessToken');
      expect(localStorage.getItem('idToken')).toBe('fakeIdToken');
      expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/home');
  });

  it('toggles the password visibility', () => {
    renderWithProviders(<Form />);

    const toggleButton = screen.getByLabelText(/toggle password visibility/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
