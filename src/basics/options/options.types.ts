import { DateRange } from 'yoda-ui/components/Form/DateRangePicker';
import { YodaFieldsState } from 'yoda-ui/yodaForm/yodaForm.types';

export type SelectOption = {
  id: string | number;
  label: string;
};

export type MultiSelectIdsType = (string | number | SelectOption)[];

export type BuildDateRangeTimeOptionsProps = {
  dateRange?: DateRange;
  startTime?: string;
  realTime?: string;
  setValue: (fieldName: string, fieldValue: DateRange | undefined) => void;
  fieldsState: YodaFieldsState;
};
