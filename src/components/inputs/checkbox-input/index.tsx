import React, { useState, forwardRef } from 'react';
import styles from './checkbox-input.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

const CheckBoxInput = ({ myRef, value, text, ...props }: any) => {
  return (
    <label className={styles.checkboxInputContainer}>
      <input
        className={clsx(styles.checkboxInput, props.className)}
        {...props}
        type="checkbox"
        checked={value}
        ref={myRef}
      />
      <span className={styles.checkmark}>
        <Image src="/check.png" height={24} width={24} alt="check" />
      </span>
      <span className="body3">{text ?? 'Remember me'}</span>
    </label>
  );
};

export default forwardRef((props: Props, ref) => <CheckBoxInput {...props} myRef={ref} />);
