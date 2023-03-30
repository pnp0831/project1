const isEmpty = (value: any) =>
  typeof value === 'undefined' ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

export const required = (message) => (field, value) => {
  return isEmpty(value) ? message || `${field} is required` : undefined;
};

export const regex = (pattern, message) => (field, value) =>
  !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
    ? message || `Value doest match pattern ${pattern}`
    : undefined;

export const number =
  (message = 'ra.validation.number') =>
  (field, value) =>
    !isEmpty(value) && isNaN(Number(value)) ? `Value is not a number` : undefined;

export const REGEX_URL =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const REGEX_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
