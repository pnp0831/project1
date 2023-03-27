import config from '~/constants/config';
export const API_GET_CATEGORY = '/categories';

export const API_GET_PRODUCT_LIST = (page = 1, category: string) =>
  `/products?${page}&limit${config.limit}&category=${category}`;

export const API_GET_PRODUCT_ITEM = (id: number) => `/products/${id}`;
