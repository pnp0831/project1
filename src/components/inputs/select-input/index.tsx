import React, { useEffect, useRef, useState } from 'react';
import styles from './select-input.module.scss';

function SelectInput({ options }) {
  let renderTime = 0;

  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  renderTime++;

  return (
    <div>
      <div>Select Input Render Time - {renderTime}</div>

      <select
        className={styles.selectInput}
        id="select-input"
        value={selectedOption}
        onChange={handleChange}
      >
        <option disabled selected value>
          {' '}
          -- select an option --{' '}
        </option>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectInput;
