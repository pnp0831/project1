import React, { useState, forwardRef } from 'react';
import styles from './slider-input.module.scss';

function SliderInput({ myRef, track, ...props }) {
  return (
    <div className={styles.sliderInput}>
      <input className={styles.sliderInput} {...props} ref={myRef} />
      <span className={styles.min}>{props.min}</span>
      <span className={styles.max}>{props.max}</span>

      <p>Value: {props.value}</p>
    </div>
  );
}

export default forwardRef((props: Props, ref) => <SliderInput {...props} myRef={ref} />);
