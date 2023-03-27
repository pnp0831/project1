import React, { ReactNode } from 'react';
import styles from './container.module.scss';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className: any;
};

const Container = (props: Props) => (
  <section className={clsx(styles.container, props.className)}>{props.children}</section>
);

export default Container;
