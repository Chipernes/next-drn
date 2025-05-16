import { useState } from 'react';
import { createTable } from 'lib/api/tables';

const useAddTableDialog = (onCreate: () => void, onClose: () => void) => {
  const [number, setNumber] = useState<number>(0);

  const handleSubmit = async () => {
    await createTable({ number });
    onCreate();
    onClose();
  };

  return {
    number,
    handleChange: setNumber,
    handleSubmit,
  };
};

export default useAddTableDialog;
