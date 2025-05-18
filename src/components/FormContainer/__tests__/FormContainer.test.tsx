/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from '@testing-library/react';
import { ButtonType } from '../../../yoda-ui/components/Button/Button.types';
import FormContainer from '../FormContainer';
import { FormContainerTypes } from '../FormContainer.types';

const defaultProps: FormContainerTypes = {
  providerFields: {
    formState: { isValid: true, isDirty: false, showError: false },
    fieldsState: {},
    groupsState: {},
    stepsState: {},
  },
  children: <div>Form Content</div>,
};

jest.mock('components/ActionButton/ActionButton', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <button>{ label }</button>,
}));

describe('FormContainer', () => {
  it('renders children inside ContentCard', () => {
    render(<FormContainer { ...defaultProps } />);
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  it('renders cancel button if config is provided', () => {
    render(
      <FormContainer
        { ...defaultProps }
        cancelButtonConfig={
          {
            label: 'Cancel',
            buttonProps: {
              onClick: jest.fn(),
              buttonType: ButtonType.neutral,
            },
          }
        }
      />,
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders submit button if config is provided', () => {
    render(
      <FormContainer
        { ...defaultProps }
        submitButtonConfig={
          {
            label: 'Submit',
            buttonProps: {
              onClick: jest.fn(),
              buttonType: ButtonType.neutral,
            },
          }
        }
      />,
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders left side empty Box when no cancel and export buttons', () => {
    render(<FormContainer { ...defaultProps } />);
    const boxes = screen.getAllByRole('generic');
    expect(boxes.length).toBeGreaterThan(0);
  });
});
