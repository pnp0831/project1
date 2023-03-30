import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { APP_ROUTE } from '~/constants';
import { formatter, onImageError } from '~/helpers';
import styles from './product-item.module.scss';

type Props = {
  product: any;
  empty: boolean;
};

const ProductItem = ({ product, empty }: Props) => {
  return (
    <div
      className={clsx(styles.productItem, {
        [styles.empty]: empty,
      })}
    >
      {!empty && (
        <Link href={`${APP_ROUTE.ECOMMERCE}/${product.category}/${product.slug}`}>
          <div className={styles.image}>
            <img alt={product.name} src={product.image} loading="lazy" onError={onImageError} />
          </div>

          <h6>{product.name}</h6>
          <div className={clsx('body2', styles.productName)}>{formatter.format(product.price)}</div>
        </Link>
      )}
    </div>
  );
};

export default ProductItem;
