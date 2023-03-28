// import { required } from 'react-admin';

const isEmpty = (value: any) =>
  typeof value === 'undefined' ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

export const required =
  (message = 'Field is required') =>
  (field, value) => {
    return isEmpty(value) ? `${field} is required` : undefined;
  };

export const regex =
  (pattern, message = 'Invalid regex') =>
  (field, value) =>
    !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
      ? `Value doest match pattern ${pattern}`
      : undefined;

export const number =
  (message = 'ra.validation.number') =>
  (field, value) =>
    !isEmpty(value) && isNaN(Number(value)) ? `Value is not a number` : undefined;
