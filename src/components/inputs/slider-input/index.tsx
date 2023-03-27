import React, { useState } from 'react';
import styles from './slider-input.module.scss';

function SliderInput() {
  const [sliderValue, setSliderValue] = useState(50);

  const handleChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="slider-input">Select a value:</label>
      <input
        className={styles.sliderInput}
        id="slider-input"
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleChange}
      />
      <p>Selected value: {sliderValue}</p>
    </div>
  );
}

export default SliderInput;
