import React, { useState, memo, forwardRef } from 'react';
import styles from './quantity-input.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import AutoAffix from 'react-overlays/lib/AutoAffix';

type Props = {
  initValue: number;
  handleOnChange: () => {};
  classname: string;
  myRef: any;
};

const QuantityInput = memo(({ classname, handleOnChange, initValue, myRef }: Props) => {
  const [value, setValue] = useState(initValue ?? 1);

  const onChange = (e) => {
    let { value } = e.target;

    if (!value) {
      value = 1;
    }

    if (value > 20) {
      value = 20;
    }

    setValue(value);

    if (handleOnChange) {
      handleOnChange(value);
    }
  };

  return (
    <div>
      <div className={clsx(styles.quantityInput, classname)}>
        <label htmlFor="quanityinput" style={{ display: 'none' }} />
        <button
          className={styles.toolBar}
          onClick={() => {
            if (value > 1) {
              setValue((value) => value - 1);

              onChange({
                target: {
                  value: value - 1,
                },
              });
            }
          }}
        >
          <Image src="/minus.png" alt="minus" height={24} width={24} />
        </button>
        <input
          value={value}
          onChange={onChange}
          id="quanityinput"
          className={clsx(styles.textInput)}
          ref={myRef}
          type="number"
          max={20}
          onKeyDown={(e) => {
            // 190 -> "."

            // 69 -> "e"

            if ([190, 69].includes(e.keyCode)) {
              e.preventDefault();
            }
          }}
        />
        <button
          className={styles.toolBar}
          onClick={() => {
            const tmpValue = value + 1 > 20 ? 20 : value + 1;
            onChange({
              target: {
                value: tmpValue,
              },
            });
          }}
        >
          <Image src="/plus.png" alt="minus" height={24} width={24} />
        </button>
      </div>
    </div>
  );
});

export default forwardRef((props: Props, ref) => <QuantityInput {...props} myRef={ref} />);
