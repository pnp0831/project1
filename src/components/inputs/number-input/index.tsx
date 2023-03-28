import React, { forwardRef } from 'react';
import styles from './number-input.module.scss';
import clsx from 'clsx';

const NumberInput = ({ myRef, min, max, onChange, ...props }: any) => {
  const handleOnChange = (e) => {
    const value = e.target.value;
    if (min && value < min) {
      return;
    }

    if (max && value > max) {
      return;
    }

    if (typeof onChange === 'function') {
      return onChange(e);
    }
  };

  return (
    <input
      className={clsx(styles.textInput, props.className)}
      {...props}
      onKeyDown={(e) => {
        if ([190, 69].includes(e.keyCode)) {
          e.preventDefault();
        }
      }}
      onChange={handleOnChange}
      ref={myRef}
      type="number"
      min={min}
      max={max}
    />
  );
};

export default forwardRef((props: Props, ref) => <NumberInput {...props} myRef={ref} />);
