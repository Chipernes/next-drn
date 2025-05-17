/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

const mockHandleCancelAuthForm = jest.fn();
const mockHandleVerifyAuthForm = jest.fn();
const mockHandleVerifyWithGoogle = jest.fn();

jest.mock('../verify.hook', () => ({
  __esModule: true,
  default: () => ({
    handleCancelAuthForm: mockHandleCancelAuthForm,
    handleVerifyAuthForm: mockHandleVerifyAuthForm,
    handleVerifyWithGoogle: mockHandleVerifyWithGoogle,
  }),
}));

jest.mock('components/AuthForm/AuthForm', () => ({
  __esModule: true,
  default: ({ submitCallback, cancelCallback }: any) => (
    <div>
      <div>Mocked AuthForm</div>
      <button onClick={ () => submitCallback({ login: 'admin', password: '1234' }) }>
        Mock Submit
      </button>
      <button onClick={ cancelCallback }>Mock Cancel</button>
    </div>
  ),
}));

describe('Verify Page', () => {
  it('renders AuthForm and Google login button', () => {
    render(<Page />);

    expect(screen.getByText('Mocked AuthForm')).toBeInTheDocument();
    expect(screen.getByText('Увійти через Google')).toBeInTheDocument();
  });

  it('calls handleVerifyWithGoogle on button click', () => {
    render(<Page />);

    const googleButton = screen.getByText('Увійти через Google');
    fireEvent.click(googleButton);

    expect(mockHandleVerifyWithGoogle).toHaveBeenCalled();
  });

  it('calls handleVerifyAuthForm on AuthForm submit', () => {
    render(<Page />);

    const submitButton = screen.getByText('Mock Submit');
    fireEvent.click(submitButton);

    expect(mockHandleVerifyAuthForm).toHaveBeenCalledWith({ login: 'admin', password: '1234' });
  });

  it('calls handleCancelAuthForm on AuthForm cancel', () => {
    render(<Page />);

    const cancelButton = screen.getByText('Mock Cancel');
    fireEvent.click(cancelButton);

    expect(mockHandleCancelAuthForm).toHaveBeenCalled();
  });
});
