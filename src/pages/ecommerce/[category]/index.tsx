import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import request from '~/helpers/axios';
import Container from '~/components/container';
import ProductListCom from '~/components/ecommerce/product-list';
import { API_GET_CATEGORY, API_GET_PRODUCT_LIST, API_GET_PRODUCT_TOTAL } from '~/apis';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CATEGORIES, LIMIT, PRODUCTS } from '~/constants';

type Props = {
  products: string[];
  total: number;
};

const ProductList = ({ products = [], total }) => {
  // const { query } = useRouter();
  // const { category } = query;
  // const [products, setProducts] = useState([]);

  // const getProducts = async (category) => {
  //   const products = await request.get(API_GET_PRODUCT_LIST(1, category));
  //   setProducts(products);
  // };
  // useEffect(() => {
  //   getProducts(category);
  // }, [category]);

  return (
    <>
      <Head>
        <title>Product List SSR</title>
        <meta name="description" content="Pants, Shorts, Shirt ,..." unique="true" />
      </Head>
      <ProductListCom products={products} total={total} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { category, page = 1 } = context.query;

  const categoryId = CATEGORIES.filter((i) => i.slug === category)?.[0];

  if (!categoryId) {
    return {
      notFound: true,
    };
  }

  const products = await request.get(API_GET_PRODUCT_LIST(page, category));
  const totalLength = await request.get(API_GET_PRODUCT_TOTAL(category));

  context.res.setHeader('Cache-Control', 's-maxage=5, state-while-revalidate');

  // const products = PRODUCTS.filter((item) => item.category === category);

  const total = totalLength.length;
  // const productsRender = products.slice((page - 1) * LIMIT, page * LIMIT);

  return {
    props: {
      products,
      total,
    },
  };
}

// export async function getStaticPaths() {
//   // const response = await request.get(API_GET_CATEGORY);

//   // const paths = response.map((post) => {
//   //   return {
//   //     params: { category: `${post.name}` },
//   //   };
//   // });

//   const paths = CATEGORIES.map((item) => {
//     return {
//       params: {
//         category: item.slug,
//       },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   const { params } = context;

//   const products = await request.get(API_GET_PRODUCT_LIST(params.category));

//   // const products = PRODUCTS.filter((item) => item.category === params.category);

//   const total = products.length;

//   // const productsRender = products.slice((page - 1) * LIMIT, page * LIMIT);

//   return {
//     props: {
//       products,
//       total,
//     },
//   };
// }

export default ProductList;
