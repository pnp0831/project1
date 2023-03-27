import React, { forwardRef } from 'react';
import styles from './text-input.module.scss';
import clsx from 'clsx';

const TextInput = ({ myRef, ...props }: any) => (
  <input className={clsx(styles.textInput, props.className)} {...props} ref={myRef} />
);

export default forwardRef((props: Props, ref) => <TextInput {...props} myRef={ref} />);
