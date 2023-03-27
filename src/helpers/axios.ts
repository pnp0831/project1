import axios from 'axios';
import config from '~/constants/config';

const request = axios.create();

const defaultHeaders = {
  'Content-Type': 'application/json',
};

request.defaults.baseURL = config.baseUrl;
request.defaults.timeout = config.timeout;

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.response.data;
      const args = error.response.data?.args || {};
      return Promise.reject({
        code: error.response.status,
        message,
        args,
      });
    }
    return Promise.reject(error);
  }
);

export default request;
