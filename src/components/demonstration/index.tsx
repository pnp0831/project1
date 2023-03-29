import React, { Fragment, memo, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../inputs/text-input';
import QuantityInput from '../inputs/quantity-input';
import CheckBoxInput from '../inputs/checkbox-input';
import SelectInput from '../inputs/select-input';
import SliderInput from '../inputs/slider-input';
import JSON_DATA from './json';
import { useFormContext } from '~/contexts/FormContext';
import guesserInput from './guessInput';
import useFieldValue from '~/components/demonstration/useField';
import useInput from '~/components/demonstration//useInput';
import { SelectArrayInput } from 'react-admin';
import Button from '../button';
import Form from './Form';
import JSONViewer from 'react-json-viewer';
import useInterval from '~/hooks/useInterval';

interface Properties {
  required?: boolean;
  options?: Array<any>;
  validate?: Array<{ pattern: any; description: string }>;
  defaultValue?: any;
  filterOn?: Array<any>;
  optionsFilterOn?: {
    [key: string]: any;
  };
}

interface InputProps {
  type: string;
  name: string;
  properties: Properties;
  id: string;
}

const WrapperInput = memo(({ children, type, ...inputProps }) => {
  const { validate, defaultValue, name, required, options, id } = inputProps;

  const { input, meta } = useInput({ ...inputProps, type });

  useEffect(() => {
    console.count(`Render times - ${name}`);
  });

  const component = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      ...input,
      options: input.options,
      type,
    });
  });

  const errorMessage = useMemo(() => {
    if (!input.error) {
      return null;
    }

    return <p style={{ color: 'red', marginTop: '10px' }}>{input.error}</p>;
  }, [input]);

  return (
    <div>
      {component}
      {errorMessage}
    </div>
  );
});

const GuessInputComponent = memo((props: InputProps) => {
  const [componentInfo, setComponentInfo] = useState({
    InputComponent: null,
    guessedProps: {},
  });

  const { InputComponent, guessedProps } = componentInfo;

  useEffect(() => {
    const { type, properties } = props;
    const { InputComponent, guessedProps } = guesserInput({
      type,
      properties,
    });

    setComponentInfo({ InputComponent, guessedProps });
  }, [props]);

  if (!InputComponent) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <span style={{ width: '200px' }}>{props.name}:</span>

      <WrapperInput name={props.name} {...guessedProps} id={props.id}>
        <InputComponent />
      </WrapperInput>
    </div>
  );
});

const JSONViewComponent = () => {
  const [json, setJson] = useState({});
  const { getFormValue } = useFormContext();

  useInterval(() => {
    const formValue = getFormValue();
    setJson(formValue);
  }, 2000);

  return <JSONViewer json={json} />;
};

const Demonstration = (props) => {
  const [isJoist, setIsJoist] = useState(true);
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    setJsonData(JSON_DATA[isJoist ? 'joist' : 'truss']);
  }, [isJoist]);

  const handleOnSubmit = (e, formValue) => {
    console.log('e', formValue);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <div
        style={{
          padding: '50px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                padding: '50px',
                textAlign: 'center',
                border: `${isJoist ? 5 : 1}px solid black`,
                cursor: 'pointer',
                width: '200px',
                marginRight: '10px',
              }}
              onClick={() => {
                setIsJoist(true);
              }}
            >
              Joist
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              {Object.values(jsonData).map((item, index) => {
                const id = Object.keys(jsonData)[index];
                return (
                  <div style={{ margin: '10px' }} key={id}>
                    <GuessInputComponent {...item} name={item.name} id={id} />
                  </div>
                );
              })}
              <Button type="submit">Submit</Button>
            </div>
            <JSONViewComponent />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Demonstration;