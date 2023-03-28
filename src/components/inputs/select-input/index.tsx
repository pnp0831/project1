import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './select-input.module.scss';

function SelectInput({ options, myRef, ...props }) {
  return (
    <div>
      <select className={styles.selectInput} id="select-input" ref={myRef} {...props}>
        <option disabled selected value>
          {' '}
          -- select an option --{' '}
        </option>
        {options.map((item) => {
          return (
            <option key={item.key} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default forwardRef((props: Props, ref) => <SelectInput {...props} myRef={ref} />);
