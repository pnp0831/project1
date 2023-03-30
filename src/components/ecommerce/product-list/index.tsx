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

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  const [windowType] = useWindowSize();

  const { isMobile } = windowType;

  return (
    <Container>
      <section className={styles.productsList}>
        {products.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <ProductItem product={item} />
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
          total > LIMIT && (
            <Pagination
              itemsPerPage={LIMIT}
              totalItems={total}
              onPageChange={handleOnPageChange}
              currentPage={currentPage}
              showLast={!isMobile}
              siblingCount={isMobile ? 1 : 2}
            />
          )
        )}
      </section>
    </Container>
  );
};

export default ProductList;
