import config from '~/constants/config';
export const API_GET_CATEGORY = '/categories';

export const API_GET_PRODUCT_LIST = (page = 1, category: string) =>
  `https://641031d1864814e5b649fc8e.mockapi.io/api/products?${page}&limit${config.limit}&category=${category}`;

export const API_GET_PRODUCT_ITEM = (category: string, slug: string) => {
  const url = new URL(`https://641031d1864814e5b649fc8e.mockapi.io/api/products`);

  url.searchParams.append('search', slug);

  return url;
};
