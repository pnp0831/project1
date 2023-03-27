import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../inputs/text-input';
import QuantityInput from '../inputs/quantity-input';
import CheckBoxInput from '../inputs/checkbox-input';
import SelectInput from '../inputs/select-input';
import SliderInput from '../inputs/slider-input';

const count = (function () {
  var counter = {};
  return function (v) {
    return (counter[v] = (counter[v] || 0) + 1);
  };
})();

const Demonstration = (props) => {
  return (
    <div
      style={{
        padding: '50px',
      }}
    >
      <div className="mb-20">
        <SelectInput
          options={[
            { value: 1, name: 'Xe ô tô' },
            { value: 2, name: 'Xe máy' },
            { value: 3, name: 'Xe đạp điện' },
            { value: 4, name: 'Xe tải' },
          ]}
          defaultValue={1}
        />
      </div>
      <div className="mb-20">
        <TextInput />
      </div>
      <div className="mb-20">
        <QuantityInput />
      </div>
      <div className="mb-20">
        <SliderInput />
      </div>
      <div className="mb-20">
        <CheckBoxInput text="Please check" />
      </div>
    </div>
  );
};

export default Demonstration;
