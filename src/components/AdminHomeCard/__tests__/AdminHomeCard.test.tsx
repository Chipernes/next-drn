/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from '@testing-library/react';
import AdminHomeCard from '../AdminHomeCard';

jest.mock('imagekitio-next', () => ({
  IKImage: (props: any) => <img { ...props } />,
}));

describe('AdminHomeCard', () => {
  const props = {
    title: 'Test Title',
    description: 'This is a test description for the card component.',
    href: '/test-link',
    imageUrl: '/test-image.jpg',
  };

  it('renders the title', () => {
    render(<AdminHomeCard { ...props } />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AdminHomeCard { ...props } />);
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('renders Link with correct href', () => {
    render(<AdminHomeCard { ...props } />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', props.href);
  });
});
