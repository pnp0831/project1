import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  memo,
} from 'react';

type Props = {
  children: ReactNode;
};

const FormContext = React.createContext();

export const useFormContext = () => useContext(FormContext);

export const FormContextProvider = ({ children }: Props) => {
  const refFormValue = useRef({});
  const refForm = useRef({});

  const onChangeForm = useCallback((id, value) => {
    refFormValue.current = {
      ...refFormValue.current,
      [id]: value,
    };

    getFormFilterOn(id, value);
  }, []);

  const registerForm = ({
    id,
    ref,
    validateInput,
    filterOn,
    optionsFilterOn,
    handleSetCustomOption,
    onChange,
  }) => {
    refForm.current = {
      ...refForm.current,
      [id]: {
        id,
        ref,
        validateInput,
        handleSetCustomOption,
        optionsFilterOn,
        filterOn,
        onChange,
      },
    };
  };

  const onSubmit = () => {
    let error = {};

    Object.values(refForm.current).forEach(({ validateInput, id }) => {
      const hasError = validateInput();

      error[id] = hasError;
    });

    return {
      formValue: refFormValue.current,
      error,
    };
  };

  const getFormValue = () => refFormValue.current;

  const getFromRef = (id) => refForm.current[id];

  const getFormFilterOn = (id, value) => {
    const inputChange = Object.keys(refForm.current).filter((key, index) => {
      return Object.values(refForm.current)[index]?.['filterOn']?.some(
        (item) => item.default === id
      );
    });

    if (inputChange.length) {
      const formValue = refFormValue.current;
      inputChange.forEach((input) => {
        const formRef = getFromRef(input);
        const filterOnValue = formValue[id];

        const inputChangeRealOptions = formRef.optionsFilterOn?.[filterOnValue] || [];

        formRef.handleSetCustomOption(inputChangeRealOptions);
        formRef.onChange({
          target: {
            value: inputChangeRealOptions?.[0]?.value,
          },
        });
      });
    }
  };

  const updateRefForm = (id, params) => {
    refForm.current = {
      ...refForm.current,
      [id]: {
        ...refForm.current[id],
        ...params,
      },
    };
  };

  return (
    <FormContext.Provider
      value={{
        onChangeForm,
        getFormValue,
        registerForm,
        onSubmit,
        getFormFilterOn,
        updateRefForm,
        getFromRef,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
