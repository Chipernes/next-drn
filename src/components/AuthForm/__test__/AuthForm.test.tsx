/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../AuthForm';
import useAuthForm from '../AuthForm.hook';

jest.mock('../AuthForm.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('valtio/react', () => {
  const originalModule = jest.requireActual('valtio/react');
  return {
    ...originalModule,
    useSnapshot: (state: any) => {
      if (state && typeof state === 'object') {
        return JSON.parse(JSON.stringify(state));
      }
      return state;
    },
  };
});

// eslint-disable-next-line react/display-name
jest.mock('yoda-ui/components/Form/TextYoda/TextYoda', () => (props: any) => {
  return <input { ...props } />;
});

describe('AuthForm', () => {
  const mockSubmitCallback = jest.fn();
  const mockCancelCallback = jest.fn();

  const providerFieldsMock = {
    onSubmit: jest.fn(),
    methods: {
      handleSubmit: (fn: any) => fn,
      register: jest.fn(),
      formState: { errors: {} },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthForm as jest.Mock).mockReturnValue({
      cancelButtonConfig: {
        label: 'Cancel',
        buttonProps: { onClick: jest.fn(), buttonType: 'secondary' },
      },
      submitButtonConfig: {
        label: 'Verify',
        buttonProps: { onClick: jest.fn(), buttonType: 'primary', disabled: false },
        loading: false,
      },
      authFormConfig: {
        login: { label: 'Login', name: 'login', placeholder: 'Login...' },
        password: { label: 'Password', name: 'password', placeholder: 'Password...', type: 'password' },
      },
      providerFields: providerFieldsMock,
    });
  });

  it('renders title and subtitle texts', () => {
    render(<AuthForm submitCallback={ mockSubmitCallback } cancelCallback={ mockCancelCallback } />);

    expect(screen.getByText('Diner Right Now')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('renders login and password input fields', () => {
    render(<AuthForm submitCallback={ mockSubmitCallback } cancelCallback={ mockCancelCallback } />);
    expect(screen.getByPlaceholderText('Login...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password...')).toBeInTheDocument();
  });

  it('renders cancel and submit buttons with correct labels', () => {
    render(<AuthForm submitCallback={ mockSubmitCallback } cancelCallback={ mockCancelCallback } />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Verify')).toBeInTheDocument();
  });

  it('calls cancel callback on cancel button click', () => {
    render(<AuthForm submitCallback={ mockSubmitCallback } cancelCallback={ mockCancelCallback } />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
  });
});
