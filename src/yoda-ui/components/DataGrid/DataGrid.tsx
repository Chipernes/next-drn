import { DataGrid as MuiDataGrid, DataGridProps } from '@mui/x-data-grid';
import { FC } from 'react';

const DataGrid: FC<DataGridProps> = (props) => (
  <MuiDataGrid { ...props } />
);

export default DataGrid;
