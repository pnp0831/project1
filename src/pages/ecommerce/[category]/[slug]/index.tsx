import Head from 'next/head';
import React from 'react';
import { API_GET_PRODUCT_ITEM } from '~/apis';
import ProductDetailC from '~/components/ecommerce/product-detail';
import { PRODUCTS } from '~/constants';
import request from '~/helpers/axios';

const data = {
  id: 7,
  createdAt: '2023-03-21T05:21:13.990Z',
  name: 'Jacket #7',
  slug: 'jacket-7',
  price: 480855,
  image:
    'https://product.hstatic.net/1000096703/product/1_318ba3d4e5844ff2b91c06e4afddd162_grande.jpg',
  category: 'jacket',
};

const ProductDetail = ({ product = {} }) => {
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductDetailC product={product} />
    </>
  );
};

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params = {} } = context;
  const { slug, category } = params;

  // console.log('params', params);

  // const products = await request.get(API_GET_PRODUCT_ITEM(slug));
  // console.log('products', products);

  const product = PRODUCTS.filter((item) => item.slug === slug && item.category === category)?.[0];

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;
