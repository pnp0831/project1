import dynamic from 'next/dynamic';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from '~/contexts/form-context';
import guesserInput from '~/helpers/guessInput';
import useInput from '~/hooks/useInput';
import useInterval from '~/hooks/useInterval';
import Button from '../button';
import FormCom from './form';
import JSON_DATA from './data-json';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

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
    console.log('s');
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
  const { required } = guessedProps;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <span style={{ width: '200px' }}>
        {props.name}
        {required && <span style={{ color: 'red' }}>*</span>}:
      </span>

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

  return <DynamicReactJson src={json} name="Form Data" />;
};

const Demonstration = (props) => {
  const refForm = useRef({});

  const [jsonData, setJsonData] = useState(JSON_DATA['joist']);

  const onEdit = ({ updated_src }) => {
    setJsonData(updated_src);
    refForm.current.resetForm();
  };

  const handleOnSubmit = (formValue, error) => {
    console.log(formValue);

    console.log('refForm', refForm.current);
  };

  return (
    <div style={{ padding: '50px' }}>
      <DynamicReactJson
        src={JSON_DATA['joist']}
        name="Json Data"
        collapsed
        enableClipboard={false}
        onEdit={onEdit}
      />

      <FormCom onSubmit={handleOnSubmit} ref={refForm}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ marginTop: '50px' }}>
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
      </FormCom>
    </div>
  );
};

export default Demonstration;
