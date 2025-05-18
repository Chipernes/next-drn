/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { Role } from 'basics/enums/schema.enums';

jest.mock('../Header.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/form', () => {
  return {
    __esModule: true,
    default: ({ action, children }: any) => <form action={ action }>{ children }</form>,
  };
});

const mockedUseHeader = require('../Header.hook').default;

const createSession = (role?: string, name?: string) => ({
  user: {
    role,
    name: name ?? 'John Doe',
  },
});

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and verifying button when not authenticated', async () => {
    mockedUseHeader.mockResolvedValueOnce({ session: null, handleLogout: jest.fn() });

    render(await Header());

    expect(screen.getByAltText('DRN-logo')).toBeInTheDocument();
    expect(screen.getByText('Go to Verifying')).toBeInTheDocument();
  });

  it('renders service navigation for SERVICE role', async () => {
    mockedUseHeader.mockResolvedValueOnce({
      session: createSession(Role.SERVICE),
      handleLogout: jest.fn(),
    });

    render(await Header());

    expect(screen.getByText('Go to Service')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders kitchen navigation for KITCHEN role', async () => {
    mockedUseHeader.mockResolvedValueOnce({
      session: createSession(Role.KITCHEN),
      handleLogout: jest.fn(),
    });

    render(await Header());

    expect(screen.getByText('Go to Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders all navigation for ADMINISTRATION role', async () => {
    mockedUseHeader.mockResolvedValueOnce({
      session: createSession(Role.ADMINISTRATION),
      handleLogout: jest.fn(),
    });

    render(await Header());

    expect(screen.getByText('Go to Service')).toBeInTheDocument();
    expect(screen.getByText('Go to Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Go to Administration')).toBeInTheDocument();
  });

  it('shows welcome message for USER role', async () => {
    mockedUseHeader.mockResolvedValueOnce({
      session: createSession(Role.USER, 'Alice'),
      handleLogout: jest.fn(),
    });

    render(await Header());

    expect(screen.getByText('Welcome, Alice')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
