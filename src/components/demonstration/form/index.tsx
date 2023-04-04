/* eslint-disable react/no-children-prop */
import React, { forwardRef, memo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormContextProvider, useFormContext } from '~/contexts/form-context';
import { email } from 'react-admin';

const WrapperForm = ({ children, onSubmit }) => {
  const { onSubmit: formSubmit } = useFormContext();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      const { formValue, error } = formSubmit();

      onSubmit(formValue, !Object.keys(error).length);
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

const Form = memo(({ children, myRef, ...props }) => {
  return (
    <FormContextProvider myRef={myRef}>
      <WrapperForm {...props} children={children} />
    </FormContextProvider>
  );
});

export default forwardRef((props: Props, ref) => <Form {...props} myRef={ref} />);
