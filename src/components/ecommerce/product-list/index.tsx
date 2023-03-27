import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '~/components/button';
import Container from '~/components/container';
import Pagination from '~/components/ecommerce/pagination';
import { APP_ROUTE, LIMIT } from '~/constants';
import useWindowSize from '~/hooks/useWindowResize';
import ProductItem from '../product-item';
import styles from './product-list.module.scss';

type Props = {};

const ProductList = ({ products, total }) => {
  const { query, push } = useRouter();
  const { category, page = 1 } = query;

  const [currentPage, setCurrentPage] = useState(Number(page));

  const handleOnPageChange = (page) => {
    const { category } = query;

    setCurrentPage(page);
    push(`${APP_ROUTE.ECOMMERCE}/${category}?page=${page}`);
  };

  const [windowType] = useWindowSize();

  const { isMobile } = windowType;

  let renderFakeItem = products.length % 4;

  switch (renderFakeItem) {
    case 1:
      renderFakeItem = 3;
      break;

    case 2:
      renderFakeItem = 2;
      break;

    case 3:
      renderFakeItem = 1;
      break;

    default:
      renderFakeItem = 0;
      break;
  }

  return (
    <Container>
      <section className={styles.productsList}>
        {products.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <ProductItem product={item} />
              {index === products.length - 1 && (
                <>
                  {Array.from(Array(renderFakeItem)).map((_, index) => (
                    <Fragment key={index}>
                      <ProductItem empty product={item} />
                    </Fragment>
                  ))}
                </>
              )}
            </React.Fragment>
          );
        })}
      </section>
      <section>
        {products.length === 0 ? (
          <div className={styles.empty}>
            <h1>Empty</h1>
            {page !== 1 && (
              <Button
                onClick={() => {
                  push(`${APP_ROUTE.ECOMMERCE}/${category}?page=1`);
                }}
              >
                Go to page 1
              </Button>
            )}
          </div>
        ) : (
          <Pagination
            itemsPerPage={LIMIT}
            totalItems={total}
            onPageChange={handleOnPageChange}
            currentPage={currentPage}
            showLast={!isMobile}
            siblingCount={isMobile ? 1 : 2}
          />
        )}
      </section>
    </Container>
  );
};

export default ProductList;
