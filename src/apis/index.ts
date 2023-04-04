import config from '~/constants/config';
export const API_GET_CATEGORY = '/categories';

export const API_GET_PRODUCT_LIST = (category: string, page: string | number) => {
  const url = new URL(`https://641031d1864814e5b649fc8e.mockapi.io/api/products`);

  if (page) {
    url.searchParams.append('page', page);
    url.searchParams.append('limit', config.limit);
  }

  url.searchParams.append('category', category);

  return url;
};

export const API_GET_PRODUCT_TOTAL = (category: string) => {
  const url = new URL(`https://641031d1864814e5b649fc8e.mockapi.io/api/products`);

  url.searchParams.append('category', category);

  return url;
};

export const API_GET_PRODUCT_ITEM = (category: string, slug: string) => {
  const url = new URL(`https://641031d1864814e5b649fc8e.mockapi.io/api/products`);

  url.searchParams.append('search', slug);

  return url;
};
