import { useRef } from 'react';

// This hook was created to keep and return the same value
// between render cicles without triggering any render when is changed
// is a simple useRef returning the current value.
const useConst = <T>(val: T) => {
  const { current } = useRef(val);
  return current;
};

export default useConst;
