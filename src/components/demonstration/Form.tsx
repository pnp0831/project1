/* eslint-disable react/no-children-prop */
import React, { memo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormContextProvider, useFormContext } from '~/contexts/form-context';
import { email } from 'react-admin';

const WrapperForm = ({ children, onSubmit }) => {
  const { onSubmit: formSubmit } = useFormContext();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      const { formValue, error } = formSubmit();
      if (!Object.keys(error).length) {
        onSubmit(formValue);
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {React.Children.map(children, (child, i) => {
        return React.cloneElement(child);
      })}
    </form>
  );
};

const Form = memo(({ children, ...props }) => {
  return (
    <FormContextProvider>
      <WrapperForm {...props} children={children} />
    </FormContextProvider>
  );
});

export default Form;
