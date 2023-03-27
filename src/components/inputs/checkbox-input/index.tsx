import React, { useState } from 'react';
import styles from './checkbox-input.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

const CheckBoxInput = (props: any) => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <label className={styles.checkboxInputContainer}>
      <input
        type="checkbox"
        className={clsx(styles.checkboxInput, props.className)}
        {...props}
        checked={checked}
        onChange={handleOnChange}
      />
      <span className={styles.checkmark}>
        <Image src="/check.png" height={24} width={24} alt="check" />
      </span>
      <span className="body3">{props.text ?? 'Remember me'}</span>
    </label>
  );
};

export default CheckBoxInput;
