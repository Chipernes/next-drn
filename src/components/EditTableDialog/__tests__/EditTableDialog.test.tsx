import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditTableDialog from '../EditTableDialog';
import { Table } from 'basics/types/schema.types';

import { updateTable } from 'lib/api/tables';

jest.mock('lib/api/tables', () => ({
  updateTable: jest.fn(),
}));

const mockTable: Table = {
  id: 'table1',
  number: 5,
};

describe('Editing a table', () => {
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial table number', () => {
    render(
      <EditTableDialog
        open={ true }
        onClose={ onClose }
        table={ mockTable }
        onUpdate={ onUpdate }
      />,
    );

    expect(screen.getByLabelText(/Номер/i)).toHaveValue(mockTable.number);
  });

  it('changes the number when entered', () => {
    render(
      <EditTableDialog
        open={ true }
        onClose={ onClose }
        table={ mockTable }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.change(screen.getByLabelText(/Номер/i), { target: { value: '10' } });

    expect(screen.getByLabelText(/Номер/i)).toHaveValue(10);
  });

  it('calls onClose on cancellation', () => {
    render(
      <EditTableDialog
        open={ true }
        onClose={ onClose }
        table={ mockTable }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Скасувати/i));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls updateTable, onUpdate and onClose on save', async () => {
    (updateTable as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EditTableDialog
        open={ true }
        onClose={ onClose }
        table={ mockTable }
        onUpdate={ onUpdate }
      />,
    );

    fireEvent.click(screen.getByText(/Зберегти/i));

    await waitFor(() => {
      expect(updateTable).toHaveBeenCalledWith(mockTable.id, { number: mockTable.number });
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
