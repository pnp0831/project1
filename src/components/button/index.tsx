import React, { ReactNode } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className: any;
  disabled: boolean;
  color: 'secondary' | 'primary';
};

const Button = (props: Props) => (
  <button
    disabled={props.disabled}
    color={props.color | 'secondary'}
    className={clsx(styles.button, props.className)}
    {...props}
  >
    {props.children}
  </button>
);

export default Button;
