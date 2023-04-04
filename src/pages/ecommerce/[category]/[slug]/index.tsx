import Head from 'next/head';
import React from 'react';
import { API_GET_PRODUCT_ITEM, API_GET_PRODUCT_LIST } from '~/apis';
import ProductDetailC from '~/components/ecommerce/product-detail';
import { CATEGORIES, PRODUCTS } from '~/constants';
import request from '~/helpers/axios';

const ProductDetail = ({ product = {} }) => {
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <meta name="description" content={`${product.name} salessss`} unique="true" />
      </Head>
      {product.id && <ProductDetailC product={product} />}
    </>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { params = {} } = context;
//   const { slug, category } = params;

//   const products = await request.get(API_GET_PRODUCT_ITEM(category, slug));

//   const product = products?.[0];

//   // const product = PRODUCTS.filter((item) => item.slug === slug && item.category === category)?.[0];

//   if (!product) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// }

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params = {} } = context;
  const { slug, category } = params;

  const products = await request.get(API_GET_PRODUCT_ITEM(category, slug));

  const product = products?.find((i) => i.slug === slug && i.category === category);
  // const product = PRODUCTS.filter((item) => item.slug === slug && item.category === category)?.[0];

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;
