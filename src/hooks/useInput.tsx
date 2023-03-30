import { useCallback, useEffect } from 'react';
import useFieldValue from './useField';

const useInput = ({
  defaultValue,
  id,
  name,
  validate,
  onBlur: customOnBlur,
  onChange: customOnChange,
  onFocus: customOnFocus,
  required,
  options,
  type,
  ...rest
}) => {
  const {
    onBlur,
    onChange,
    onFocus,
    error,
    options: inputOptions,
    ...inputProps
  } = useFieldValue({
    name,
    validate,
    defaultValue,
    required,
    id,
    type,
    options,
    ...rest,
  });

  const handleBlur = useCallback(
    (event) => {
      onBlur(event);
      if (typeof customOnBlur === 'function') {
        customOnBlur(event);
      }
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (event) => {
      onChange(event);
      if (typeof customOnChange === 'function') {
        customOnChange(event);
      }
    },
    [onChange, customOnChange]
  );

  const handleFocus = useCallback(
    (event) => {
      onFocus(event);
      if (typeof customOnFocus === 'function') {
        customOnFocus(event);
      }
    },
    [onFocus, customOnFocus]
  );

  return {
    input: {
      ...inputProps,
      id: id || name,
      options: inputOptions,
      onBlur: handleBlur,
      onChange: handleChange,
      onFocus: handleFocus,
      error,
    },
    meta: {
      error,
    },
  };
};

export default useInput;
