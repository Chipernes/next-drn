import { Dispatch, SetStateAction } from 'react';
import { SelectOption } from 'basics/options/options.types';

type OnChangeType = <T extends SelectOption>(
  valueOnChange: T | null,
) => void;

export type SelectAsyncProps = {
  disableClearable?: boolean;
  disabled?: boolean;
  label: string;
  lazyQueryHook: Function;
  messageEmpty?: string;
  messageInitial?: string;
  minQueryLength?: number;
  messageLoading?: string;
  onChange?: OnChangeType;
  placeholder?: string;
  required?: boolean;
  reset?: boolean;
  setCanAdd?: Dispatch<SetStateAction<boolean>>;
  excludedOptions?: SelectOption[];
};

type Omitted = 'disableClearable'
| 'disabled'
| 'label'
| 'placeholder'
| 'required';

export type UseSelectAsyncParams = Omit<SelectAsyncProps, Omitted>;
