import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useFormContext } from '~/contexts/form-context';
import { required as requiredFunc } from '~/helpers/validation';

const useFieldValue = ({
  name,
  defaultValue,
  validate,
  required,
  id,
  type,
  filterOn,
  optionsFilterOn,
  options,
  ...inputProps
}) => {
  const { onChangeForm, registerForm } = useFormContext();

  const refTouched = useRef();
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState();
  const [touched, setTouched] = useState(false);
  const refInput = useRef();

  const [customOptions, setCustomOptions] = useState(options);

  const handleSetCustomOption = (options) => setCustomOptions(options);

  useEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      onChange({
        target: {
          value: defaultValue,
          checked: defaultValue,
        },
      });
    }
  }, [defaultValue]);

  const onChange = (e) => {
    let newValue = e.target.value;
    if (type === 'checkbox') {
      newValue = e.target.checked;
    }

    setValue(newValue);
    onChangeForm(id, newValue);

    const hasError = validateInput(newValue);

    if (newValue && error && !hasError) {
      setError();
    }

    if (!refTouched.current) {
      refTouched.current = true;
    }
  };

  const validateInput = (newValue) => {
    let hasError = false;
    for (let index = 0; index < validate.length; index++) {
      const currentValidate = validate[index];

      if (typeof currentValidate === 'function') {
        let checkValue = value;
        if (typeof newValue !== 'undefined') {
          checkValue = newValue;
        }
        const errorMessage = currentValidate(name, checkValue);

        if (errorMessage) {
          hasError = true;
          setError(errorMessage);
          break;
        }
      }
    }
    return hasError;
  };

  const onBlur = useCallback(() => {
    validateInput();
  }, [value]);

  const onFocus = useCallback(() => {
    if (!touched) {
      setTouched(true);
    }
  }, []);

  useEffect(() => {
    registerForm({
      id,
      ref: refInput,
      validateInput,
      filterOn,
      optionsFilterOn,
      handleSetCustomOption,
      onChange,
    });
  }, [refInput, validateInput, filterOn, optionsFilterOn, handleSetCustomOption]);

  const extendProps = {};

  ['text', 'min', 'max', 'step', 'track'].forEach((item) => {
    if (inputProps[item]) {
      extendProps[item] = inputProps[item];
    }
  });

  return {
    value,
    error,
    onChange,
    onBlur,
    onFocus,
    ref: refInput,
    options: customOptions,
    ...extendProps,
  };
};

export default useFieldValue;
