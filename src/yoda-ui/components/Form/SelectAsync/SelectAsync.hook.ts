import { debounce } from 'lodash';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { useState, ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo } from 'react';
import { UseSelectAsyncParams } from './SelectAsync.types';
import { SelectOption } from 'basics/options/options.types';
import { findOptionById } from 'yoda-ui/utils/options.utils';

const hasSameId = (a: SelectOption, b: SelectOption) => a.id === b.id;
const hasMinimalLength = (string: string, minLength: number) => string.length >= minLength;

const useSelectAsync = ({
  lazyQueryHook,
  messageEmpty = 'No options',
  messageInitial = 'Search by email',
  minQueryLength = 3,
  messageLoading = 'Loading',
  onChange,
  reset,
  setCanAdd,
  excludedOptions = [],
}: UseSelectAsyncParams) => {
  const [fieldValue, setFieldValue] = useState<string | number>('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(messageInitial);
  const { lazyQuery, loading, data } = lazyQueryHook();
  const [filteredData, setFilteredData] = useState<SelectOption[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLazyQuery = useCallback(debounce(lazyQuery, 350), [lazyQuery]);

  useEffect(() => {
    if (query) {
      debouncedLazyQuery(query);
    }
  }, [query, minQueryLength, lazyQuery, debouncedLazyQuery]);

  useEffect(() => {
    if (data) {
      const filtered = differenceWith(data, excludedOptions, hasSameId);
      setFilteredData((prev) => (isEqual(prev, filtered) ? prev : filtered));
    }
  }, [data, excludedOptions]);

  useEffect(() => {
    if (loading) {
      setMessage(messageLoading);
    }
    if (filteredData) {
      const listLength = filteredData.length;
      if (!loading && listLength === 0) {
        setMessage(messageEmpty);
      }
    }
  }, [loading, filteredData, messageEmpty, messageLoading, excludedOptions]);

  useEffect(() => {
    if (fieldValue === '' && setCanAdd) {
      setCanAdd(false);
    }
  }, [fieldValue, setCanAdd]);

  useEffect(() => {
    if (reset) {
      setFieldValue('');
      setShowOptions(false);
    }
  }, [reset]);

  const handleSelectChange = (_: SyntheticEvent, currentOption: SelectOption | null) => {
    if (currentOption) {
      setFieldValue(currentOption.id);
    } else {
      setFieldValue('');
    }
    if (onChange) {
      onChange(currentOption);
    }
  };

  const handleInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    if (hasMinimalLength(input, minQueryLength)) {
      setQuery(input);
      setShowOptions(true);
    } else {
      setQuery('');
      setShowOptions(false);
    }
  };

  const findCurrentOptionById = useCallback((id: string | number): SelectOption | null => {
    if (filteredData) {
      const currentOption = findOptionById(filteredData, id);
      if (!currentOption) {
        setFieldValue('');
      }
      return currentOption;
    }
    return null;
  }, [filteredData]);

  const value = useMemo(() => (fieldValue ? findCurrentOptionById(fieldValue as string) : null), [fieldValue, findCurrentOptionById]);

  const options = useMemo(() => (showOptions && filteredData ? filteredData : []), [filteredData, showOptions]);

  return {
    message,
    value,
    handleInputTextChange,
    handleSelectChange,
    options,
  };
};

export default useSelectAsync;
