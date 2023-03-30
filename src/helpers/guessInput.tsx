import CheckBoxInput from '../components/inputs/checkbox-input';
import NumberInput from '../components/inputs/number-input';
import QuantityInput from '../components/inputs/quantity-input';
import SelectInput from '../components/inputs/select-input';
import SliderInput from '../components/inputs/slider-input';
import TextInput from '../components/inputs/text-input';
import { regex, REGEX_URL, required, REGEX_EMAIL } from './validation';

const guesserInput = ({ properties, type, validate }) => {
  let InputComponent;
  let guessedProps = {
    validate: [],
  };

  switch (type) {
    case 'text':
      InputComponent = TextInput;
      break;

    case 'number':
    case 'decimal':
      InputComponent = NumberInput;
      if (properties.min) {
        guessedProps.min = properties.min;
      }
      if (properties.max) {
        guessedProps.max = properties.max;
      }
      break;

    case 'dropdown':
      InputComponent = SelectInput;
      guessedProps.options = properties.options;
      break;

    case 'checkbox':
      InputComponent = CheckBoxInput;
      guessedProps.type = 'checkbox';
      guessedProps.text = properties.text;
      break;

    case 'range':
      InputComponent = SliderInput;
      guessedProps.type = 'range';
      guessedProps.min = properties.min;
      guessedProps.max = properties.max;
      guessedProps.step = properties.step;
      guessedProps.track = properties.track;
      break;

    default:
      InputComponent = TextInput;
      break;
  }

  // handle validate
  if (properties.required) {
    guessedProps.required = true;
    guessedProps.validate.push(required());
  }

  // handle format type
  if (['password', 'email', 'number'].includes(properties?.format)) {
    guessedProps.type = properties?.format;
  }

  if (properties.format === 'email') {
    guessedProps.validate.push(regex(REGEX_EMAIL, 'Invalid Email'));
  }

  if (properties.format === 'url') {
    guessedProps.validate.push(regex(REGEX_URL, 'Invalid Url'));
  }

  if (properties.validate?.length && Array.isArray(properties.validate)) {
    properties.validate.forEach((validateItem) => {
      if ('pattern' in validateItem) {
        guessedProps.validate.push(regex(validateItem.pattern, validateItem.descrpition));
      }
    });
  }

  // handle default value
  if (properties.defaultValue) {
    guessedProps.defaultValue = properties.defaultValue;
  }

  // handle default value
  if (properties.filterOn) {
    guessedProps.filterOn = properties.filterOn;

    if (properties.optionsFilterOn) {
      guessedProps.optionsFilterOn = properties.optionsFilterOn;
    }
  }

  if (properties.text) {
    guessedProps.text = properties.text;
  }

  return { InputComponent, guessedProps };
};

export default guesserInput;
